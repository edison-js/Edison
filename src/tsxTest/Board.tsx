// Board.tsx
import React, { useEffect, useState, createContext, ReactNode } from 'react'
import { board } from '../utils/board'
import type { SerialPort } from 'serialport'

export const BoardContext = createContext<SerialPort | null>(null)

interface BoardProps {
  children: ReactNode
  onReady?: (port: SerialPort) => void
}
export const Board: React.FC<BoardProps> = ({ children, onReady }) => {
  const [port, setPort] = useState<SerialPort | null>(null)

  useEffect(() => {
    board.on('ready', (connectedPort) => {
      setPort(connectedPort)
      onReady?.(connectedPort)
    })
  }, [onReady])

  return (
    <BoardContext.Provider value={port}>
      {port && children}
    </BoardContext.Provider>
  )
}
