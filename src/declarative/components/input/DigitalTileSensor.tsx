import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const DigitalTileSensorContext = createContext<SerialPort | null>(null)

type DigitalTileSensorProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const DigitalTileSensor: React.FC<DigitalTileSensorProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupDigitalTileSensor = (port: SerialPort) => {
    const digitaltilesensor = attachInput(port, pin)

    if (untriggered) {
      digitaltilesensor.read('off', untriggered)
    }

    if (triggered) {
      digitaltilesensor.read('on', triggered)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupDigitalTileSensor(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupDigitalTileSensor(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <DigitalTileSensorContext.Provider value={null}>
      {children}
    </DigitalTileSensorContext.Provider>
  )
}
