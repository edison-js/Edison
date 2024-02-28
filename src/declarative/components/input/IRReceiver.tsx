import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const IRReceiverContext = createContext<SerialPort | null>(null)

type IRReceiverProps = {
  pin: number
  onPress?: () => void
  onRelease?: () => void
  debounceTime?: number
  children: React.ReactNode
}

export const IRReceiver: React.FC<IRReceiverProps> = ({
  pin,
  onPress,
  onRelease,
  children,
}) => {
  const setupIRReceiver = (port: SerialPort) => {
    const irReceiver = attachInput(port, pin)

    if (onRelease) {
      irReceiver.read('off', onRelease)
    }

    if (onPress) {
      irReceiver.read('on', onPress)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupIRReceiver(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupIRReceiver(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <IRReceiverContext.Provider value={null}>
      {children}
    </IRReceiverContext.Provider>
  )
}
