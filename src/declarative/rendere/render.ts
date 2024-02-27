import process from 'node:process'
import type { ReactNode } from 'react'
import Edison, { type Options as edisonOptions } from './edison'
import instances from './instances'

export type RenderOptions = {
  /**
   * Output stream where app will be rendered.
   *
   * @default process.stdout
   */
  stdout?: NodeJS.WriteStream
  /**
   * Input stream where app will listen for input.
   *
   * @default process.stdin
   */
  stdin?: NodeJS.ReadStream
  /**
   * Error stream.
   * @default process.stderr
   */
  stderr?: NodeJS.WriteStream
  /**
   * If true, each update will be rendered as a separate output, without replacing the previous one.
   *
   * @default false
   */
  debug?: boolean
  /**
   * Configure whether Edison should listen to Ctrl+C keyboard input and exit the app. This is needed in case `process.stdin` is in raw mode, because then Ctrl+C is ignored by default and process is expected to handle it manually.
   *
   * @default true
   */
  exitOnCtrlC?: boolean

  /**
   * Patch console methods to ensure console output doesn't mix with Edison output.
   *
   * @default true
   */
  patchConsole?: boolean
}

export type Instance = {
  /**
   * Replace previous root node with a new one or update props of the current root node.
   */
  rerender: Edison['render']
  /**
   * Manually unmount the whole Edison app.
   */
  unmount: Edison['unmount']
  /**
   * Returns a promise, which resolves when app is unmounted.
   */
  waitUntilExit: Edison['waitUntilExit']
  cleanup: () => void
}

/**
 * Mount a component and render the output.
 */
export const render = (node: ReactNode): Instance => {
  const edisonOptions: edisonOptions = {
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true,
  }

  const instance: Edison = getInstance(
    edisonOptions.stdout,
    () => new Edison(edisonOptions),
  )

  instance.render(node)

  return {
    rerender: instance.render,
    unmount() {
      instance.unmount()
    },
    waitUntilExit: instance.waitUntilExit,
    cleanup: () => instances.delete(edisonOptions.stdout),
  }
}

const getInstance = (
  stdout: NodeJS.WriteStream,
  createInstance: () => Edison,
): Edison => {
  let instance = instances.get(stdout)

  if (!instance) {
    instance = createInstance()
    instances.set(stdout, instance)
  }

  return instance
}
