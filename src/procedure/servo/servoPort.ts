import type { SerialPort } from 'serialport'
import { setPinToServo } from '../helper/Servo/setPinToServo'
import { setServoAngle } from '../helper/Servo/setServoAngle'
import { delay } from '../utils/delay'

export const servoPort = (port: SerialPort) => {
  return (pin: number) => {
    return {
      setAngle: async (angle: number) => {
        const TAKE_TIME_SECOND = 2

        await setPinToServo(pin, port)
        await setServoAngle(pin, angle, port)

        const time = 180 + Math.abs(angle - 90) * TAKE_TIME_SECOND
        await delay(time)
      },
      rotate: async (speed: number) => {
        await setPinToServo(pin, port)
        await setServoAngle(pin, speed, port)
      },
    }
  }
}
