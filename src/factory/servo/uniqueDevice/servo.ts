import type { SerialPort } from 'serialport'
import { servoPort } from '../servoPort'

export const attachServo = (port: SerialPort, pin: number) => {
  const servo = servoPort(port)(pin)

  return {
    rotate: async (angle: number) => {
      const duration = 290 + Math.abs(angle - 90) * 2.5
      await servo.rotate(angle)
    },
  }
}
