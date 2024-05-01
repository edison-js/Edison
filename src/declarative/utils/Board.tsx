import React, { createContext } from 'react'
import type { SerialPort } from 'serialport'
import { board } from '../../procedure/utils/board'

export const BoardContext = createContext<SerialPort | null>(null)

type BoardProps = {
  children: React.ReactNode
  port: string
  baudRate: number
}

export const Board: React.FC<BoardProps> = ({ children, port, baudRate }) => {
  const currentPort = board.getCurrentPort()

  if (currentPort) {
    return (
      <BoardContext.Provider value={null}>{children}</BoardContext.Provider>
    )
  }
  board.connectManual(port, baudRate)
  return <BoardContext.Provider value={null}>{children}</BoardContext.Provider>
}
