import {SerialPort} from "serialport";

const path = '/dev/ttyACM0';
const port = new SerialPort({path, baudRate: 57600 }); // Replace "/dev/ttyACM0" with your serial port name

const SET_PIN_MODE = 0xF4;
const SERVO_MODE = 0x04;
const PIN_NUMBER = 9;
const ANALOG_MESSAGE = 0xE0 | (PIN_NUMBER & 0x0F);

let angle = 0;

// When the port is open, you can send the data
port.on("open", () => {
  const pinModeMessage = Buffer.from([SET_PIN_MODE, PIN_NUMBER, SERVO_MODE]);
  port.write(pinModeMessage);

  // Use setInterval to periodically update the servo angle
  const interval = setInterval(() => {
    // Write the servo angle
    const analogWriteMessage = Buffer.from([ANALOG_MESSAGE, angle & 0x7F, (angle >> 7) & 0x7F]);
    port.write(analogWriteMessage);

    // Update the angle for next iteration
    angle += 5;
    if (angle > 180) {
      clearInterval(interval);

      // Optionally, move the servo back to 0°
      setTimeout(() => {
        angle = 0;
        const resetMessage = Buffer.from([ANALOG_MESSAGE, angle & 0x7F, (angle >> 7) & 0x7F]);
        port.write(resetMessage);
      }, 1000);  // Delay for 1 second before resetting angle
    }
  }, 100);  // Update every 100ms
});
