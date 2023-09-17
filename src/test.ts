import {SerialPort} from 'serialport';

const START_SYSEX = 0xF0;
const END_SYSEX = 0xF7;
const SERVO_CONFIG = 0x70;
const SET_PIN_MODE = 0xF4;
const SERVO = 0x0E; // Command for servo control in Firmata
const ANALOG_MESSAGE = 0xE0; // Command for analog message in Firmata

// Configure the serial port
const path = '/dev/ttyACM0';
const port = new SerialPort({ path, baudRate: 57600 });

port.on('open', function () {
  console.log('Serial Port Opened');

  // Configure servo, here we are setting pin 9 for servo with angle 0 to 180
  const servoConfigBuffer = Buffer.from([START_SYSEX, SERVO_CONFIG, 9, 0, 180 & 0x7F, (180 >> 7) & 0x7F, END_SYSEX]);
  port.write(servoConfigBuffer);

  // Set pin 9 to SERVO mode
  const setPinModeBuffer = Buffer.from([SET_PIN_MODE, 9, SERVO]);
  port.write(setPinModeBuffer);

  // Set servo to 90 degrees on pin 9
  const servoWriteBuffer = Buffer.from([ANALOG_MESSAGE, 9, 90 & 0x7F, (90 >> 7) & 0x7F]);
  port.write(servoWriteBuffer);
});

// If the serial port is closed
port.on('close', function () {
  console.log('Serial Port Closed');
});

// If an error occurred with the serial port
port.on('error', function (err) {
  console.log('Error: ', err.message);
});

// Use this function to dynamically set the servo angle.
function setServoAngle(angle: number) {
  const servoWriteBuffer = Buffer.from([ANALOG_MESSAGE, 9, angle & 0x7F, (angle >> 7) & 0x7F]);
  port.write(servoWriteBuffer);
}
