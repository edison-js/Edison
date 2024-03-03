import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/examples/input/uniqueDevice/input'

export const PhotoInterrupterContext = createContext<SerialPort | null>(null)

type PhotoInterrupterProps = {
  pin: number
  onPress?: () => void
  onRelease?: () => void
  debounceTime?: number
  children: React.ReactNode
}

export const PhotoInterrupter: React.FC<PhotoInterrupterProps> = ({
  pin,
  onPress,
  onRelease,
  children,
}) => {
  const setupPhotoInterrupter = (port: SerialPort) => {
    const photointerrupter = attachInput(port, pin)

    if (onRelease) {
      photointerrupter.read('off', onRelease)
    }

    if (onPress) {
      photointerrupter.read('on', onPress)
    }
  }

  if (board.isReady()) {
    const port = board.getCurrentPort()
    if (port) {
      setupPhotoInterrupter(port)
    }
  } else {
    const handleReady = (port: SerialPort) => {
      setupPhotoInterrupter(port)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }

  return (
    <PhotoInterrupterContext.Provider value={null}>
      {children}
    </PhotoInterrupterContext.Provider>
  )
}
