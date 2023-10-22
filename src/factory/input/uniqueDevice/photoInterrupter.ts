import { inputPort } from '../inputPort'
import { SerialPort } from 'serialport'

export const attachPhotoInterrupter = (port: SerialPort, pin: number) => {
  const photoInterrupter = inputPort(port)(pin)

  return {
    on: async () => {
      await photoInterrupter.read()
    },
  }
}
