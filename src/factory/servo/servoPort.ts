import { SerialPort } from "serialport";
import { setPinToServo } from "../../helper/Servo/setPinToServo";
import { setServoAngle } from "../../helper/Servo/setServoAngle";
import { delay } from "../../utils/delay";

export const servoPort = (port:SerialPort) => {
  return (pin: number) => {
  return {
    rotate: async (angle: number) => {
      //console.log(4)
      await setPinToServo(pin, port);
      await setServoAngle(pin, angle, port);

      //console.log(`Rotating to ${angle} degrees`);
      const DELAY_TIME = 290 +(Math.abs(angle - 90) * 2.5);
      await delay(DELAY_TIME);
    }
  };
};
}