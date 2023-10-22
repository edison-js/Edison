import { inputPort } from '../inputPort'
import { SerialPort } from 'serialport'

export const attachReadSensor = (port: SerialPort, pin: number) => {
  const readSensor = inputPort(port)(pin)

  return {
    on: async () => {
      await readSensor.read()
    },
  }
}
