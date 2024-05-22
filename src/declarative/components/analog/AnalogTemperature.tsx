import { attachAnalog } from '../../../procedure/analog/uniqueDevice/analog'
import type { AnalogPin } from '../../../procedure/types/analog/analog'
import { board } from '../../../procedure/utils/board'
import React, { createContext, useEffect, useState } from 'react'
import type { SerialPort } from 'serialport'

export const AnalogTemperatureContext = createContext<SerialPort | null>(null)

type AnalogTemperatureProps = {
  pin: AnalogPin
  onValueChange?: (value: number) => void
  children: (value: number) => React.ReactNode
}

export const AnalogTemperature: React.FC<AnalogTemperatureProps> = ({
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
        const fenya = (sensorValue / 1023) * 5
        const r = ((5 - fenya) / fenya) * 4700
        setValue(1 / (Math.log(r / 10000) / 3950 + 1 / (25 + 273.15)) - 273.15)
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
    <AnalogTemperatureContext.Provider value={port}>
      {children(value)}
    </AnalogTemperatureContext.Provider>
  )
}
