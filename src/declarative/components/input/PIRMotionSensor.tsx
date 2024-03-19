import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const PIRMotionSensorContext = createContext<SerialPort | null>(null)

type PIRMotionSensorProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const PIRMotionSensor: React.FC<PIRMotionSensorProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupPIRMotionSensor = (port: SerialPort) => {
    const pirMotionSensor = attachInput(port, pin)

    if (triggered) {
      pirMotionSensor.read('off', triggered)
    }

    if (untriggered) {
      pirMotionSensor.read('on', untriggered)
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
