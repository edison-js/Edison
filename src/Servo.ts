import {SerialPort} from 'serialport';
import { findArduinoPath } from './components/findArduinoPath';
import { setServoAngle } from './helper/Servo/setServoAngle';
import { setPinToServo } from './helper/Servo/setPinToServo';
import { portClose } from './components/portClose';


export const Servo = async (pin: number, angle: number) => {
  let isFirstDataReceived = true;
  let receivedData = Buffer.alloc(0); // concat data buffer from arduino

  const path = await findArduinoPath();
  const port = new SerialPort({path, baudRate: 57600 });

// Wait for the serial port to open
port.on('data', async function(data) {
  receivedData = Buffer.concat([receivedData, data]); // concat received buffer
  const sixteenthBit = receivedData.toString('hex') // convert buffer to 16bit string
  //console.log(sixteenthBit)

  if (isFirstDataReceived) {
  isFirstDataReceived = false;
  await setPinToServo(pin, port);
  //console.log(`Setting servo angle to ${angle}`);
  await setServoAngle(pin, angle, port);
  }

  // If the last 2 bytes are <Buffer 00 f7>, you can close the port
  if (sixteenthBit.endsWith('00f7')) {
    await portClose(port);
  }
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})
}
