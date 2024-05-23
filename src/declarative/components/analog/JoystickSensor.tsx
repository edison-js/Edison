import { attachAnalog } from '../../../procedure/analog/uniqueDevice/analog'
import type { AnalogPin } from '../../../procedure/types/analog/analog'
import { board } from '../../../procedure/utils/board'
import React, { createContext, useEffect, useState } from 'react'
import type { SerialPort } from 'serialport'

export const JoystickSensorContext = createContext<SerialPort | null>(null)

type JoystickSensorProps = {
  pinx: AnalogPin
  piny: AnalogPin
  onValuexChange?: (x: number) => void
  onValueyChange?: (y: number) => void
  children: (valuex: number, valuey: number) => React.ReactNode
}

export const JoystickSensor: React.FC<JoystickSensorProps> = ({
  pinx,
  piny,
  onValuexChange,
  onValueyChange,
  children,
}) => {
  const [port, setPort] = useState<SerialPort | null>(null)
  const [valuex, setValuex] = useState<number>(0)
  const [valuey, setValuey] = useState<number>(0)

  useEffect(() => {
    const setupSensor = (port: SerialPort) => {
      const joystickSensorX = attachAnalog(port, pinx)
      const joystickSensorY = attachAnalog(port, piny)

      joystickSensorX.read('change', async (sensorValuex: number) => {
        setValuex(sensorValuex)

        if (onValuexChange) {
          onValuexChange(sensorValuex)
        }
      })
      joystickSensorY.read('change', async (sensorValuey: number) => {
        setValuey(sensorValuey)

        if (onValueyChange) {
          onValueyChange(sensorValuey)
        }
      })
    }

    const handleReady = (port: SerialPort) => {
      setupSensor(port)
      setPort(port)
      board.off('ready', handleReady)
    }

    if (board.isReady()) {
      const currentPort = board.getCurrentPort()
      if (currentPort) {
        setupSensor(currentPort)
        setPort(currentPort)
      }
    } else {
      board.on('ready', handleReady)
    }

    return () => {
      board.off('ready', handleReady)
    }
  }, [pinx, piny, onValuexChange, onValueyChange])

  return (
    <JoystickSensorContext.Provider value={port}>
      {children(valuex, valuey)}
    </JoystickSensorContext.Provider>
  )
}
