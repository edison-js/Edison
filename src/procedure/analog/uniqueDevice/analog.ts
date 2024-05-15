import type { SerialPort } from 'serialport'
import type { AnalogPin, Sensor } from '../../types/analog/analog'
import { analogPort } from '../analogPort'

export const attachAnalog = (port: SerialPort, pin: AnalogPin) => {
  const analogSensor = analogPort(port)(pin)
  let currentValue: number | null = null

  return {
    read: async (
      method: Sensor,
      func: (value: number) => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      return analogSensor.read(method, async (value: number) => {
        currentValue = value
        await func(value)
      })
    },
    getValue: () => currentValue,
  }
}
