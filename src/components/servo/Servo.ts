import {SerialPort} from 'serialport';
import { setServoAngle } from '../../helper/Servo/setServoAngle';
import { setPinToServo } from '../../helper/Servo/setPinToServo';
import { portClose } from '../../utils/portClose';

export const Servo = ( path:string, pin: number, angle: number): Promise<void> => {
  const port = new SerialPort({ path, baudRate: 57600 });

  let firstDataReceived = true;
  return new Promise((resolve, reject) => {
    console.log(angle);
    let receivedData = Buffer.alloc(0); // concat data buffer from arduino
    const onDataReceived = async (data: Buffer) => {
      console.log(data)
      receivedData = Buffer.concat([receivedData, data]); // concat received buffer
      const sixteenthBit = receivedData.toString('hex'); // convert buffer to 16bit string

      // Initialize and set servo angle
      if (firstDataReceived) {
        firstDataReceived = false;
        await setPinToServo(pin, port);
        console.log(`Setting servo angle to ${angle}`);
        await setServoAngle(pin, angle, port);
      }

      // If the last 2 bytes are <Buffer 00 f7>, you can remove the listener
      if (sixteenthBit.endsWith('00f7')) {
        console.log('end');
        await portClose(port);
        resolve();
      }
    };

    port.on('data', onDataReceived);

    port.on('error', (err) => {
      console.log('Error: ', err.message);
      port.removeListener('data', onDataReceived);
      reject(err);
    });
  });
};
