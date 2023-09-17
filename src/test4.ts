import {SerialPort} from 'serialport';

// Initialize the serial port (replace '/dev/tty-usbserial1' with your port's name, it varies)
const path = '/dev/ttyACM0';
const port = new SerialPort({path,
  baudRate: 57600
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// Switch pin 9 to servo mode
const setPinToServo = () => {
  const PIN_MODE_SERVO = 0x04;
  const PIN = 9;
  const data = [
    0xF4, // Set pin mode command
    PIN, // Pin number
    PIN_MODE_SERVO // Pin mode
  ];
  port.write(Buffer.from(data));
}

// Set servo angle
const setServoAngle = (angle: number) => {
  const PIN = 9;
  const data = [
    0xE0 | PIN, // Start analog message for pin
    angle & 0x7F, // Send 7 bits only
    (angle >> 7) & 0x7F // bitwise shift and take next 7 bits
  ];
  port.write(Buffer.from(data));
}

// Wait for the serial port to open
port.on('data', function(data) {
  // Set pin 9 to servo mode
  console.log('data received: ' + data)
  setPinToServo();

  // Send servo angle in a loop
  let angle = 0;
  setInterval(() => {
    console.log(`Setting servo angle to ${angle}`);
    setServoAngle(angle);
    
    angle += 10;
    if (angle > 180) {
      angle = 0;
    }
  }, 1000);
});
