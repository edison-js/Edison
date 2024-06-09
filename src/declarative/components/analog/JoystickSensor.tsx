import { attachAnalog } from '../../../procedure/analog/uniqueDevice/analog'
import type { AnalogPin } from '../../../procedure/types/analog/analog'
import { board } from '../../../procedure/utils/board'
import React, { createContext, useEffect, useState } from 'react'
import type { SerialPort } from 'serialport'

export const JoystickSensorContext = createContext<SerialPort | null>(null)

type JoystickSensorProps = {
  pinX: AnalogPin
  pinY: AnalogPin
  onValueXChange?: (x: number) => void
  onValueYChange?: (y: number) => void
  children: (valueX: number, valueY: number) => React.ReactNode
}

export const JoystickSensor: React.FC<JoystickSensorProps> = ({
  pinX,
  pinY,
  onValueXChange,
  onValueYChange,
  children,
}) => {
  const [port, setPort] = useState<SerialPort | null>(null)
  const [valueX, setValueX] = useState<number>(0)
  const [valueY, setValueY] = useState<number>(0)

  useEffect(() => {
    const setupSensor = (port: SerialPort) => {
      const joystickSensorX = attachAnalog(port, pinX)
      const joystickSensorY = attachAnalog(port, pinY)

      joystickSensorX.read('change', async (sensorValueX: number) => {
        setValueX(sensorValueX)

        if (onValueXChange) {
          onValueXChange(sensorValueX)
        }
      })
      joystickSensorY.read('change', async (sensorValueY: number) => {
        setValueY(sensorValueY)

        if (onValueYChange) {
          onValueYChange(sensorValueY)
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
  }, [pinX, pinY, onValueXChange, onValueYChange])

  return (
    <JoystickSensorContext.Provider value={port}>
      {children(valueX, valueY)}
    </JoystickSensorContext.Provider>
  )
}
