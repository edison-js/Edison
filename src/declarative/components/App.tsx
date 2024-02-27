import React from 'react'
import AppContext from './AppContext'

type Props = {
  readonly children: React.ReactNode
  readonly stdin: NodeJS.ReadStream
  readonly stdout: NodeJS.WriteStream
  readonly stderr: NodeJS.WriteStream
  readonly exitOnCtrlC: boolean
  readonly onExit: (error?: Error) => void
}

const App = ({ children, onExit }: Props) => {
  const contextValue = {
    exit: onExit,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default App
