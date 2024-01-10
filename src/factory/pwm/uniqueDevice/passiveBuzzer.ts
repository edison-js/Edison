import type { SerialPort } from 'serialport'
import { pwmPort } from '../pwmPort'

export const attachPassiveBuzzer = (port: SerialPort, pin: number) => {
  // Initialize pins to OUTPUT and set them to OFF
  const passiveBuzzer = pwmPort(port)(pin)
  passiveBuzzer.off()
  return {
    // r will be changed from number to template literal in the future
    sound: async (r: number) => {
      await passiveBuzzer.analogWrite(r)
    },
    off: async () => {
      await passiveBuzzer.off()
    },
  }
}
