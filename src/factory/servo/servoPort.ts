import type { SerialPort } from 'serialport'
import { setPinToServo } from '../../helper/Servo/setPinToServo'
import { setServoAngle } from '../../helper/Servo/setServoAngle'
import { delay } from '../../utils/delay'

export const servoPort = (port: SerialPort) => {
  return (pin: number) => {
    return {
      setAngle: async (angle: number,recentAngle: number | null) => {
        ////console.log(4)
        await setPinToServo(pin, port)
        await setServoAngle(pin, angle, port)

        ////console.log(`Rotating to ${angle} degrees`);
        //const DELAY_TIME = 180 + Math.abs(angle - 90) * 2.5
        //await delay(DELAY_TIME)
        const DELAY_TIME = (recentAngle !== null ? Math.abs(angle - recentAngle) * 2 : 400);
        await delay(DELAY_TIME)
      },
      rotate: async (speed: number) => {
        ////console.log(4)
        await setPinToServo(pin, port)
        await setServoAngle(pin, speed, port)

        ////console.log(`Rotating and direction to ${speed}`);
      },
    }
  }
}
