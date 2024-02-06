import type { SerialPort } from 'serialport'
import { servoPort } from '../servoPort'

export const attachServo = (port: SerialPort, pin: number) => {
  const servo = servoPort(port)(pin);
  let recentAngle: (number | null) = null;


  return {
    setAngle: async (angle: number) => {
        

      const duration = 290 + Math.abs(angle - 90) * 2.5;
      await servo.setAngle(angle,recentAngle)

      //console.log(recentAngle);
      recentAngle = angle;
    },
  }
}
