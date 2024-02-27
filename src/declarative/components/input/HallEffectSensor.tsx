import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachHallEffectSensor } from '../../../procedure/examples/input/uniqueDevice/hallEffectSensor'

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
    const hallEffectiveSensor = attachHallEffectSensor(port, pin)

    if (onPress) {
      hallEffectiveSensor.read('on', onPress)
    }

    if (onRelease) {
      hallEffectiveSensor.read('off', onRelease)
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
