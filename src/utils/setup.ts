import { SerialPort } from "serialport";
import { Mode } from "../../global";
import { InputMode, OutputMode, PwmMode, ServoMode } from "../types/Mode";
import { setPinToServo } from "../helper/Servo/setPinToServo";
import { setServoAngle } from "../helper/Servo/setServoAngle";
import { delay } from "./delay";

export const setup = <T extends Mode>(path: string, pin: number, mode: T): 
  T extends 'Servo' ? ServoMode :
  T extends 'Pwm' ? PwmMode :
  T extends 'Output' ? OutputMode :
  InputMode => {

    let onDataReady: (() => void) | null = null;
    const dataReady = new Promise<void>(resolve => {
      onDataReady = resolve;
    });

    const port = new SerialPort({ path, baudRate: 57600 });
    
    port.on('data', (data) => {
        console.log('Data:', data)
        if (onDataReady) {
           onDataReady();
         }
    })
  
  if (mode === 'Servo') {
    return {
      lotate: async (angle: number) => {
            await dataReady
            await setPinToServo(pin, port);
            await setServoAngle(pin, angle, port);
            //Time to rotatation end
            console.log(`Rotating to ${angle} degrees`)
            const DELAY_TIME = 290 +(Math.abs(angle - 90) * 2.5);
            await delay(DELAY_TIME);
    }
    } as any;
  }

  if (mode === 'Pwm') {
    return {
      on: () => {
        console.log('PWM on')
      },
      off: () => {
        console.log('PWM off')
      }
    } as any;
  }
  
  // Add more modes here
  
return{} as any;
};