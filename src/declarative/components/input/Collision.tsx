import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const CollisionContext = createContext<SerialPort | null>(null)

type CollisionProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const Collision: React.FC<CollisionProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupCollision = (port: SerialPort) => {
    const collisionSensor = attachInput(port, pin)

    if (untriggered) {
      collisionSensor.read('off', untriggered)
    }

    if (triggered) {
      collisionSensor.read('on', triggered)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupCollision(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupCollision(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <CollisionContext.Provider value={null}>
      {children}
    </CollisionContext.Provider>
  )
}
