import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const DigitalTiltSensorContext = createContext<SerialPort | null>(null)

type DigitalTiltSensorProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const DigitalTilt: React.FC<DigitalTiltSensorProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupDigitalTiltSensor = (port: SerialPort) => {
    const DigitalTiltSensor = attachInput(port, pin)

    if (untriggered) {
      DigitalTiltSensor.read('off', untriggered)
    }

    if (triggered) {
      DigitalTiltSensor.read('on', triggered)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupDigitalTiltSensor(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupDigitalTiltSensor(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <DigitalTiltSensorContext.Provider value={null}>
      {children}
    </DigitalTiltSensorContext.Provider>
  )
}
