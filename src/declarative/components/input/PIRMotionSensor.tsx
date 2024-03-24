import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'
import { delay } from '@/procedure/utils/delay'

export const PIRMotionSensorContext = createContext<SerialPort | null>(null)

type PIRMotionSensorProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  delaytime?: number
  children: React.ReactNode
}

export const PIRMotionSensor: React.FC<PIRMotionSensorProps> = ({
  pin,
  triggered,
  untriggered,
  delaytime,
  children,
}) => {
  const setupPIRMotionSensor = async (port: SerialPort) => {
    const pirMotionSensor = attachInput(port, pin)

    if (triggered) {
      pirMotionSensor.read('off', triggered)
    }

    if (untriggered) {
      if (delaytime) {
        const port = board.getCurrentPort()
        if (port) {
          port.pause()
          await delay(delaytime)
          port.resume()
        }
      }
      await pirMotionSensor.read('on', untriggered)
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
