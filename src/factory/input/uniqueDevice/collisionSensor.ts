import { inputPort } from '../inputPort'
import { SerialPort } from 'serialport'

export const attachCollisionSensor = (port: SerialPort, pin: number) => {
  const collisionSensor = inputPort(port)(pin)

  return {
    on: async () => {
      await collisionSensor.read()
    },
  }
}
