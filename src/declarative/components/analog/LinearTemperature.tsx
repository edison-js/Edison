import { attachAnalog } from '../../../procedure/analog/uniqueDevice/analog'
import type { AnalogPin } from '../../../procedure/types/analog/analog'
import { board } from '../../../procedure/utils/board'
import React, { createContext, useEffect, useState } from 'react'
import type { SerialPort } from 'serialport'

export const LinearTemperatureContext = createContext<SerialPort | null>(null)

type LinearTemperatureProps = {
  pin: AnalogPin
  onValueChange?: (value: number) => void
  children: (value: number) => React.ReactNode
}

export const LinearTemperature: React.FC<LinearTemperatureProps> = ({
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
        setValue((500 * sensorValue) / 1024)
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
    <LinearTemperatureContext.Provider value={port}>
      {children(value)}
    </LinearTemperatureContext.Provider>
  )
}
