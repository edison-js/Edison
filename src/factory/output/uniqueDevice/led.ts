import { outputPort } from '../outputPort'
import { SerialPort } from 'serialport'
import { delay } from '../../../utils/delay'

export const createLed = (port: SerialPort, pin: number) => {
  const led = outputPort(port)(pin)

  return {
    pin,
    blink: async (duration: number) => {
      while (true) {
        await led.on()
        await delay(duration)
        await led.off()
        await delay(duration)
      }
    },
  }
}
