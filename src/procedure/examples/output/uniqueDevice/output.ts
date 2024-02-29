import { outputPort } from '../outputPort'
import type { SerialPort } from 'serialport'
import { delay } from '../../../utils/delay'

export const attachOutput = (port: SerialPort, pin: number) => {
  const output = outputPort(port)(pin)

  return {
    blink: async (duration: number) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await output.on()
        await delay(duration)
        await output.off()
        await delay(duration)
      }
    },
    on: async () => {
      await output.on()
    },
    off: async () => {
      await output.off()
    },
  }
}
