import type { SerialPort } from 'serialport'
import { servoPort } from '../servoPort'

export const attachRotationServo = (port: SerialPort, pin: number) => {
  const servo = servoPort(port)(pin)

  return {
    rotate: async (speed: number) => {

      //0 <=speed <= 180. Stops when speed = 90. Rightward when speed > 90

      await servo.rotate(speed)

    },
  }
}
