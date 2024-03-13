import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const HallEffectiveContext = createContext<SerialPort | null>(null)

type HallEffectProps = {
  pin: number
  onPress?: () => void
  onRelease?: () => void
  debounceTime?: number
  children: React.ReactNode
}

export const HallEffective: React.FC<HallEffectProps> = ({
  pin,
  onPress,
  onRelease,
  children,
}) => {
  const setupHallEffective = (port: SerialPort) => {
    const hallEffectiveSensor = attachInput(port, pin)

    if (onRelease) {
      hallEffectiveSensor.read('off', onRelease)
    }

    if (onPress) {
      hallEffectiveSensor.read('on', onPress)
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
