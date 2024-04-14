import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const ButtonContext = createContext<SerialPort | null>(null)

type ButtonProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupButton = (port: SerialPort) => {
    const pushButton = attachInput(port, pin)

    if (untriggered) {
      pushButton.read('off', untriggered)
    }

    if (triggered) {
      pushButton.read('on', triggered)
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
