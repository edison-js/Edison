import { inputPort } from '../inputPort'
import type { SerialPort } from 'serialport'
import { Sensor } from '../../../types/analog/analog'

export const attachHallEffectSensor = (port: SerialPort, pin: number) => {
  const collisionSensor = inputPort(port)(pin)

  return {
    read: async (
      method: Sensor,
      func: () => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      return collisionSensor.read(method, async () => {
        //triger once
        await func()
      })
    },
  }
}
