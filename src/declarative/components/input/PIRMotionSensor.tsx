import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/input/uniqueDevice/input'

export const PIRMotionSensorContext = createContext<SerialPort | null>(null)

type PIRMotionSensorProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  delayTime?: number
  children: React.ReactNode
}

export const PIRMotion: React.FC<PIRMotionSensorProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupPIRMotionSensor = async (port: SerialPort) => {
    const pirMotionSensor = attachInput(port, pin)

    if (untriggered) {
      pirMotionSensor.read('off', untriggered)
    }

    if (triggered) {
      pirMotionSensor.read('on', triggered)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupPIRMotionSensor(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupPIRMotionSensor(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <PIRMotionSensorContext.Provider value={null}>
      {children}
    </PIRMotionSensorContext.Provider>
  )
}
