import React, { PureComponent, type ReactNode } from 'react'
import cliCursor from 'cli-cursor'
import AppContext from './AppContext'
import ErrorOverview from './ErrorOverview'

type Props = {
  readonly children: ReactNode
  readonly stdin: NodeJS.ReadStream
  readonly stdout: NodeJS.WriteStream
  readonly stderr: NodeJS.WriteStream
  readonly exitOnCtrlC: boolean
  readonly onExit: (error?: Error) => void
}

type State = {
  readonly error?: Error
}

export default class App extends PureComponent<Props, State> {
  static displayName = 'InternalApp'

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  override state = {
    error: undefined,
  }

  override render() {
    return (
      <AppContext.Provider
        value={{
          exit: this.handleExit,
        }}
      >
        {this.state.error ? (
          <ErrorOverview error={this.state.error as Error} />
        ) : (
          this.props.children
        )}
      </AppContext.Provider>
    )
  }

  override componentDidMount() {
    cliCursor.hide(this.props.stdout)
  }

  override componentWillUnmount() {
    cliCursor.show(this.props.stdout)
  }

  override componentDidCatch(error: Error) {
    this.handleExit(error)
  }

  handleExit = (error?: Error): void => {
    this.props.onExit(error)
  }
}
