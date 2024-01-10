import type { SerialPort } from 'serialport'
import { AnalogPin, Sensor } from '../../../types/analog/analog'
import { analogPort } from '../analogPort'

export const attachPressureSensor = (port: SerialPort, pin: AnalogPin) => {
  const pressureSensor = analogPort(port)(pin)
  let isTriggered = false

  return {
    read: async (
      method: Sensor,
      func: () => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      return pressureSensor.read(method, async () => {
        //triger once
        if (isTriggered === false) {
          isTriggered = true
          await func()
        }
      })
    },
    onOver: async (
      method: Sensor,
      func: () => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      return
    },
  }
}
