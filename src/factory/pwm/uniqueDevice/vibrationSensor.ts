import { SerialPort } from 'serialport'
import { pwmPort } from '../pwmPort'

export const attachVibrationSensor = (port: SerialPort, pin: number) => {
  // Initialize pins to OUTPUT and set them to OFF
  const vibrationSensor = pwmPort(port)(pin)
  vibrationSensor.off()
  return {
    // r will be changed from number to template literal in the future
    write: async (r: number) => {
      await vibrationSensor.analogWrite(r)
    },
    off: async () => {
      await vibrationSensor.off()
    },
  }
}
