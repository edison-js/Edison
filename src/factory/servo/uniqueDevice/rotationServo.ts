import type { SerialPort } from 'serialport'
import { servoPort } from '../servoPort'

export const attachRotationServo = (port: SerialPort, pin: number) => {
  const servo = servoPort(port)(pin)

  return {
    rotate: async (speed: number) => {

      await servo.rotate(speed)
      
    },
  }
}
