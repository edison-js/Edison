import { SerialPort } from 'serialport'
import { pwmPort } from '../pwmPort'

export const attachMortorModule = (port: SerialPort, pin: number) => {
  // Initialize pins to OUTPUT and set them to OFF
  const motorModule = pwmPort(port)(pin)
  motorModule.off()
  return {
    // r will be changed from number to template literal in the future
    sound: async (r: number) => {
      await motorModule.analogWrite(r)
    },
    off: async () => {
      await motorModule.off()
    },
  }
}
