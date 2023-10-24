import { SerialPort } from 'serialport'
import { pwmPort } from '../../pwm/pwmPort'

export const attachRgbLed = (
  port: SerialPort,
  redPin: number,
  greenPin: number,
  bluePin: number,
) => {
  // Initialize pins to OUTPUT and set them to OFF
  const redLed = pwmPort(port)(redPin)
  redLed.off()
  const greenLed = pwmPort(port)(greenPin)
  greenLed.off()
  const blueLed = pwmPort(port)(bluePin)
  blueLed.off()
  return {
    setColor: async (r: number, g: number, b: number) => {
      await redLed.analogWrite(r)
      await greenLed.analogWrite(g)
      await blueLed.analogWrite(b)
    },
    off: async () => {
      await redLed.off()
      await greenLed.off()
      await blueLed.off()
    },
  }
}
