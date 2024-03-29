import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachButton } from '../../../procedure/examples/input/uniqueDevice/pushButton'

export const ButtonContext = createContext<SerialPort | null>(null)

type ButtonProps = {
  pin: number
  onPress?: () => void
  onRelease?: () => void
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  pin,
  onPress,
  onRelease,
  children,
}) => {
  const setupButton = (port: SerialPort) => {
    const pushButton = attachButton(port, pin)

    if (onRelease) {
      pushButton.read('off', onRelease)
    }

    if (onPress) {
      pushButton.read('on', onPress)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupButton(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupButton(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <ButtonContext.Provider value={null}>{children}</ButtonContext.Provider>
  )
}
