import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const InputContext = createContext<SerialPort | null>(null)

type InputProps = {
  pin: number
  onPress?: () => void
  onRelease?: () => void
  children: React.ReactNode
}

export const Button: React.FC<InputProps> = ({
  pin,
  onPress,
  onRelease,
  children,
}) => {
  const setupInput = (port: SerialPort) => {
    const input = attachInput(port, pin)

    if (onRelease) {
      input.read('off', onRelease)
    }

    if (onPress) {
      input.read('on', onPress)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupInput(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupInput(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return <InputContext.Provider value={null}>{children}</InputContext.Provider>
}
