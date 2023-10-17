import { SerialPort } from 'serialport'

// Switch pin 9 to servo mode
export const setPinToServo = (pin: number, port: SerialPort): Promise<void> => {
  const PIN = pin
  const data = [
    0xf4, // Set pin mode command
    PIN,
    3, // Pin mode
  ]
  port.write(Buffer.from(data))
  ////console.log('setpintoservo,',data)
  return
}
