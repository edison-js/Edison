import { outputPort } from '../outputPort'
import { SerialPort } from 'serialport'
import { delay } from '../../../utils/delay'

export const createBuzzer = (port: SerialPort, pin: number) => {
  const buzzer = outputPort(port)(pin)

  return {
    pin,
    on: async () => {
      while (true) {
        await buzzer.on()
      }
    },
  }
}
