import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const HallEffectiveContext = createContext<SerialPort | null>(null)

type HallEffectProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const HallEffective: React.FC<HallEffectProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupHallEffective = (port: SerialPort) => {
    const hallEffectiveSensor = attachInput(port, pin)

    if (untriggered) {
      hallEffectiveSensor.read('off', untriggered)
    }

    if (triggered) {
      hallEffectiveSensor.read('on', triggered)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupHallEffective(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupHallEffective(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <HallEffectiveContext.Provider value={null}>
      {children}
    </HallEffectiveContext.Provider>
  )
}
