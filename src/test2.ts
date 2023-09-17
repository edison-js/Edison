import {SerialPort} from "serialport";



const SET_PIN_MODE = 0xF4;
const SERVO_MODE = 0x04;
const PIN_NUMBER = 9;

const pinModeMessage = Buffer.from([SET_PIN_MODE, PIN_NUMBER, SERVO_MODE]);
const ANALOG_MESSAGE = 0xE0 | (PIN_NUMBER & 0x0F); // 0xE0 is the analog message command byte
const value = 90; // Replace 90 with the desired angle (0-180)

const analogWriteMessage = Buffer.from([ANALOG_MESSAGE, value & 0x7F, (value >> 7) & 0x7F]);

const START_SYSEX = 0xF0;
const END_SYSEX = 0xF7;
const SERVO_CONFIG = 0x70;

const minPulse = 544; // in microseconds, typically 544
const maxPulse = 2400; // in microseconds, typically 2400

const servoConfigMessage = Buffer.from([
  START_SYSEX,
  SERVO_CONFIG,
  PIN_NUMBER,
  minPulse & 0x7F, (minPulse >> 7) & 0x7F,
  maxPulse & 0x7F, (maxPulse >> 7) & 0x7F,
  END_SYSEX
]);

const path = '/dev/ttyACM0';
const port = new SerialPort({path, baudRate: 57600 }); // Replace "/dev/ttyACM0" with your serial port name

// When the port is open, you can send the data
port.on("open", () => {
  port.write(pinModeMessage);
  port.write(servoConfigMessage);
  port.write(analogWriteMessage);
});