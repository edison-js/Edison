import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachAnalog } from '../../../procedure/examples/analog/uniqueDevice/analog'
import type { AnalogPin } from '../../../procedure/types/analog/analog'

export const MicrophoneContext = createContext<SerialPort | null>(null)

type MicrophoneProps = {
  pin: AnalogPin
  children: React.ReactNode
}

export const Microphone: React.FC<MicrophoneProps> = ({ pin, children }) => {
  const setupMicrophone = (port: SerialPort) => {
    const attachMicrophone = attachAnalog(port, pin)

    attachMicrophone.read('on', () => {})
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupMicrophone(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupMicrophone(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <MicrophoneContext.Provider value={null}>
      {children}
    </MicrophoneContext.Provider>
  )
}
