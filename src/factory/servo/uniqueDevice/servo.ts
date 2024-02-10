import type { SerialPort } from 'serialport'
import { servoPort } from '../servoPort'

export const attachServo = (port: SerialPort, pin: number) => {
  const servo = servoPort(port)(pin)

  return {
    setAngle: async (angle: number) => {
      await servo.setAngle(angle)
    },
  }
}
