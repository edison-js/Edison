// Board.tsx
import React, { createContext } from 'react'
import { SerialPort } from 'serialport'

export const BoardContext = createContext<SerialPort | null>(null)

interface BoardProps {
  children: React.ReactNode
  onReady: (port: SerialPort) => void
}

export const Board: React.FC<BoardProps> = ({ children, onReady }) => {
  return <BoardContext.Provider value={null}>{children}</BoardContext.Provider>
}
