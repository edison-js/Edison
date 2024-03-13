import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const CollisionContext = createContext<SerialPort | null>(null)

type CollisionProps = {
  pin: number
  onPress?: () => void
  onRelease?: () => void
  children: React.ReactNode
}

export const Collision: React.FC<CollisionProps> = ({
  pin,
  onPress,
  onRelease,
  children,
}) => {
  const setupCollision = (port: SerialPort) => {
    const collisionSensor = attachInput(port, pin)

    if (onRelease) {
      collisionSensor.read('off', onRelease)
    }

    if (onPress) {
      collisionSensor.read('on', onPress)
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
