import { SerialPort } from "serialport"
import { findArduinoPath } from "./components/findArduinoPath";
import { bufferOutput } from "./components/bufferOutput";

const START_SYSEX = 0xF0;
const END_SYSEX = 0xF7;
const SERVO_CONFIG = 0x70;
const SET_PIN_MODE = 0xF4;
const SERVO = 0x0E;
const ANALOG_MESSAGE = 0xE0; // Command for analog message in Firmata

export const Servo = async (pin: number, angle: number) => {

  const path = await findArduinoPath();
  const port = new SerialPort({ path, baudRate: 57600 });

// SERVO_CONFIGコマンドを送信してサーボモーターを設定
const servoConfig = Buffer.from([START_SYSEX, SERVO_CONFIG, 9, 0, 180 & 0x7F, (180 >> 7) & 0x7F, END_SYSEX]);
port.write(servoConfig);

// EXTENDED_ANALOGコマンドを送信してサーボモーターを制御

port.on('data', (data) => {
  console.log('Data from Arduino:', data);
  const lastTwoBytes = data.slice(-2);

  if (lastTwoBytes.equals(Buffer.from([0x00, 0xf7]))) {
    setInterval(() => {
      // angleは0-180の範囲で設定
      console.log(angle);
      const servoControl = Buffer.from([ANALOG_MESSAGE, 9, 90 & 0x7F, (90 >> 7) & 0x7F]);
      port.write(servoControl);
      angle += 10;
      if (angle > 180) {
        angle = 0;
      }
    }, 2000);
}
});
}

Servo(9, 30);
