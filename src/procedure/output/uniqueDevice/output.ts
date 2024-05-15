import { outputPort } from '../outputPort'
import type { SerialPort } from 'serialport'

export const attachOutput = (port: SerialPort, pin: number) => {
  const output = outputPort(port)(pin)

  return {
    on: async () => {
      await output.on()
    },
    off: async () => {
      await output.off()
    },
  }
}
