import { outputPort } from '../outputPort'
import { SerialPort } from 'serialport'

export const attachBuzzer = (port: SerialPort, pin: number) => {
  const buzzer = outputPort(port)(pin)

  return {
    on: async () => {
      await buzzer.on()
    },
    off: async () => {
      await buzzer.off()
    },
  }
}
