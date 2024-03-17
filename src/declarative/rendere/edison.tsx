import process from 'node:process'
import { type ReactNode } from 'react'
import throttle from 'lodash/throttle'
import isInCi from 'is-in-ci'
import autoBind from 'auto-bind'
import { type FiberRoot } from 'react-reconciler'
import Yoga from 'yoga-wasm-web/auto'
import reconciler from './reconciler'
import render from './renderer'
import * as dom from './dom'
import instances from './instances'
import App from '../components/App'

const noop = () => {}

export type Options = {
  stdout: NodeJS.WriteStream
  stdin: NodeJS.ReadStream
  stderr: NodeJS.WriteStream
  debug: boolean
  exitOnCtrlC: boolean
  patchConsole: boolean
  waitUntilExit?: () => Promise<void>
}

export default class Edison {
  private readonly options: Options
  // Ignore last render after unmounting a tree to prevent empty output before exit
  private isUnmounted: boolean
  private lastOutput: string
  private readonly container: FiberRoot
  private readonly rootNode: dom.DOMElement
  // This variable is used only in debug mode to store full static output
  // so that it's rerendered every time, not just new static parts, like in non-debug mode
  private fullStaticOutput: string
  private exitPromise?: Promise<void>
  private restoreConsole?: () => void
  private readonly unsubscribeResize?: () => void

  constructor(options: Options) {
    autoBind(this)

    this.options = options
    this.rootNode = dom.createNode('edison-root')
    this.rootNode.onComputeLayout = this.calculateLayout

    this.rootNode.onRender = options.debug
      ? this.onRender
      : throttle(this.onRender, 32, {
          leading: true,
          trailing: true,
        })

    this.rootNode.onImmediateRender = this.onRender

    // Ignore last render after unmounting a tree to prevent empty output before exit
    this.isUnmounted = false

    // Store last output to only rerender when needed
    this.lastOutput = ''

    // This variable is used only in debug mode to store full static output
    // so that it's rerendered every time, not just new static parts, like in non-debug mode
    this.fullStaticOutput = ''

    this.container = reconciler.createContainer(
      this.rootNode,
      // Legacy mode
      0,
      null,
      false,
      null,
      'id',
      () => {},
      null,
    )

    // Unmount when process exits
    // this.unsubscribeExit = signalExit(this.unmount, { alwaysLast: false })

    if (process.env.DEV === 'true') {
      reconciler.injectIntoDevTools({
        bundleType: 0,
        // Reporting React DOM's version, not Edison's
        // See https://github.com/facebook/react/issues/16666#issuecomment-532639905
        version: '16.13.1',
        rendererPackageName: 'edison',
      })
    }

    if (options.patchConsole) {
      this.patchConsole()
    }

    if (!isInCi) {
      options.stdout.on('resize', this.resized)

      this.unsubscribeResize = () => {
        options.stdout.off('resize', this.resized)
      }
    }
  }

  resized = () => {
    this.calculateLayout()
    this.onRender()
  }

  resolveExitPromise: () => void = () => {}
  rejectExitPromise: (reason?: Error) => void = () => {}
  unsubscribeExit: () => void = () => {}

  calculateLayout = () => {
    // The 'columns' property can be undefined or 0 when not using a TTY.
    // In that case we fall back to 80.
    const terminalWidth = this.options.stdout.columns || 80

    this.rootNode.yogaNode?.setWidth(terminalWidth)

    this.rootNode.yogaNode?.calculateLayout(
      undefined,
      undefined,
      Yoga.DIRECTION_LTR,
    )
  }

  onRender: () => void = () => {
    if (this.isUnmounted) {
      return
    }

    // If use ansi-escapes to clear the terminal, add outputHeight to Destructuring assignmen
    const { output, staticOutput } = render()

    // If <Static> output isn't empty, it means new children have been added to it
    const hasStaticOutput = staticOutput && staticOutput !== '\n'

    if (this.options.debug) {
      if (hasStaticOutput) {
        this.fullStaticOutput += staticOutput
      }

      this.options.stdout.write(this.fullStaticOutput + output)
      return
    }

    if (isInCi) {
      if (hasStaticOutput) {
        this.options.stdout.write(staticOutput)
      }

      this.lastOutput = output
      return
    }

    if (hasStaticOutput) {
      this.fullStaticOutput += staticOutput
    }

    // if (outputHeight >= this.options.stdout.rows) {
    //   this.options.stdout.write(
    //     ansiEscapes.clearTerminal + this.fullStaticOutput + output,
    //   )
    //   this.lastOutput = output
    //   return
    // }

    this.lastOutput = output
  }

  render(node: ReactNode): void {
    const tree = (
      <App
        stdin={this.options.stdin}
        stdout={this.options.stdout}
        stderr={this.options.stderr}
        exitOnCtrlC={this.options.exitOnCtrlC}
        onExit={this.unmount}
      >
        {node}
      </App>
    )

    reconciler.updateContainer(tree, this.container, null, noop)
  }

  writeToStdout(data: string): void {
    if (this.isUnmounted) {
      return
    }

    if (this.options.debug) {
      this.options.stdout.write(data + this.fullStaticOutput + this.lastOutput)
      return
    }

    if (isInCi) {
      this.options.stdout.write(data)
      return
    }
  }

  writeToStderr(data: string): void {
    if (this.isUnmounted) {
      return
    }

    if (this.options.debug) {
      this.options.stderr.write(data)
      this.options.stdout.write(this.fullStaticOutput + this.lastOutput)
      return
    }

    if (isInCi) {
      this.options.stderr.write(data)
      return
    }
  }

  unmount(error?: Error | number | null): void {
    if (this.isUnmounted) {
      return
    }

    this.calculateLayout()
    this.onRender()
    this.unsubscribeExit()

    if (typeof this.restoreConsole === 'function') {
      this.restoreConsole()
    }

    if (typeof this.unsubscribeResize === 'function') {
      this.unsubscribeResize()
    }

    this.isUnmounted = true

    reconciler.updateContainer(null, this.container, null, noop)
    instances.delete(this.options.stdout)

    if (error instanceof Error) {
      this.rejectExitPromise(error)
    } else {
      this.resolveExitPromise()
    }
  }

  async waitUntilExit(): Promise<void> {
    if (!this.exitPromise) {
      this.exitPromise = new Promise((resolve, reject) => {
        this.resolveExitPromise = resolve
        this.rejectExitPromise = reject
      })
    }

    return this.exitPromise
  }

  patchConsole(): void {
    if (this.options.debug) {
      return
    }
  }
}
