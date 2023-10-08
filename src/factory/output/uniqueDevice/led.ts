import { outputPort } from '../outputPort'
import { SerialPort } from 'serialport'
import { delay } from '../../../utils/delay'

export const attachLed = (port: SerialPort, pin: number) => {
  const led = outputPort(port)(pin)

  return {
    blink: async (duration: number) => {
      while (true) {
        await led.on()
        await delay(duration)
        await led.off()
        await delay(duration)
      }
    },
    on: async () => {
      await led.on()
    },
    off: async () => {
      await led.off()
    },
  }
}
