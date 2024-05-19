import type { SerialPort } from 'serialport'
import React, { createContext } from 'react'
import { board } from '../../../procedure/utils/board'
import { attachInput } from '../../../procedure/input/uniqueDevice/input'

export const PhotoInterrupterContext = createContext<SerialPort | null>(null)

type PhotoInterrupterProps = {
  pin: number
  triggered?: () => void
  untriggered?: () => void
  children: React.ReactNode
}

export const PhotoInterrupter: React.FC<PhotoInterrupterProps> = ({
  pin,
  triggered,
  untriggered,
  children,
}) => {
  const setupPhotoInterrupter = (port: SerialPort) => {
    const photointerrupter = attachInput(port, pin)

    if (untriggered) {
      photointerrupter.read('off', untriggered)
    }

    if (triggered) {
      photointerrupter.read('on', triggered)
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
