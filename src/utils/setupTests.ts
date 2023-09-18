import { SerialPort } from "serialport";
import { setPinToServo } from "../helper/Servo/setPinToServo";
import { findArduinoPath } from "./findArduinoPath";
import { setServoAngle } from "../helper/Servo/setServoAngle";
import { delay } from "./delay";
import { setLedState } from "../components/led/LED";

const setup = async () => {
    console.log(1)
    const path = await findArduinoPath()
    
    const port = new SerialPort({ path, baudRate: 57600 });
    
    let onDataReady: (() => void) | null = null;
    const dataReady = new Promise<void>(resolve => {
        console.log(3)
      onDataReady = resolve;
    });

    port.on('data', (data) => {
        console.log('Data:', data)
        if (onDataReady) {
           onDataReady();
         }
        })

        await dataReady

  const servo = (pin: number) => {
    return {
      lotate: async (angle: number) => {
        console.log(4)
        await setPinToServo(pin, port);
        await setServoAngle(pin, angle, port);

        console.log(`Rotating to ${angle} degrees`);
        const DELAY_TIME = 290 +(Math.abs(angle - 90) * 2.5);
        await delay(DELAY_TIME);
      }
    };
  };
  
  const led = (pin: number) => {
    return {
      on: async () => {
        await dataReady;
        await setLedState(pin, true, port);
      },
      off: async () => {
        await dataReady;
        await setLedState(pin, false, port);
      }
    };
  };
  
  return {
    servo,
    led
  };
}

export default setup;
