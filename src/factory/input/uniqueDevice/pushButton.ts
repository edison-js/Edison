import { inputPort } from '../inputPort'
import { SerialPort } from 'serialport'

export const attachPushButton = (port: SerialPort, pin: number) => {
  const pushButton = inputPort(port)(pin)

  return {
    on: async () => {
      await pushButton.read()
    },
  }
}
