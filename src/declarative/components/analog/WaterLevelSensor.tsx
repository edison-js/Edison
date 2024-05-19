import { attachAnalog } from '../../../procedure/analog/uniqueDevice/analog'
import type { AnalogPin } from '../../../procedure/types/analog/analog'
import { board } from '../../../procedure/utils/board'
import React, { createContext, useEffect, useState } from 'react'
import type { SerialPort } from 'serialport'

export const WaterLevelContext = createContext<SerialPort | null>(null)

type WaterLevelSensorProps = {
  pin: AnalogPin
  onValueChange?: (value: number) => void
  children: (value: number) => React.ReactNode
}

export const WaterLevelSensor: React.FC<WaterLevelSensorProps> = ({
  pin,
  onValueChange,
  children,
}) => {
  const [port, setPort] = useState<SerialPort | null>(null)
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    const setupSensor = (port: SerialPort) => {
      const waterSensor = attachAnalog(port, pin)

      waterSensor.read('change', async (sensorValue: number) => {
        setValue(sensorValue)
        if (onValueChange) {
          onValueChange(sensorValue)
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
  }, [pin, onValueChange])

  return (
    <WaterLevelContext.Provider value={port}>
      {children(value)}
    </WaterLevelContext.Provider>
  )
}
