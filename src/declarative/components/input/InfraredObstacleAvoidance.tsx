import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const InfraredObstacleAvoidanceContext =
  createContext<SerialPort | null>(null)

type InfraredObstacleAvoidanceProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const InfraredObstacleAvoidance: React.FC<
  InfraredObstacleAvoidanceProps
> = ({ pin, triggered, untriggered, children }) => {
  const setupInfraredObstacleAvoidance = (port: SerialPort) => {
    const infraredobstacleavoidanceSensor = attachInput(port, pin)

    if (triggered) {
      infraredobstacleavoidanceSensor.read('on', triggered)
    }

    if (untriggered) {
      infraredobstacleavoidanceSensor.read('off', untriggered)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupInfraredObstacleAvoidance(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupInfraredObstacleAvoidance(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <InfraredObstacleAvoidanceContext.Provider value={null}>
      {children}
    </InfraredObstacleAvoidanceContext.Provider>
  )
}
