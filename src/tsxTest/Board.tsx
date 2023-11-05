// Board.tsx

import React, { useEffect, useState, createContext } from 'react'
import { SerialPort } from 'serialport'
import { board } from '../utils/board'

export const BoardContext = createContext<SerialPort | null>(null)

interface BoardProps {
  children: React.ReactNode
  onReady: (port: SerialPort) => void
}

export const Board: React.FC<BoardProps> = ({ children, onReady }) => {
  const [port, setPort] = useState<SerialPort | null>(null)
  console.log(4)
  board.on('ready', (connectedPort: SerialPort) => {
    setPort(connectedPort)
    onReady(connectedPort)
  })
  board.connectAutomatic()
  console.log(2)

  return <BoardContext.Provider value={port}>{children}</BoardContext.Provider>
}
