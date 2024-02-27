import type { SerialPort } from 'serialport'

// Switch pin 9 to servo mode
export const setPinToServo = (pin: number, port: SerialPort): Promise<void> => {
  const PIN_MODE_SERVO = 0x04
  const PIN = pin
  const data = [
    0xf4, // Set pin mode command
    PIN,
    PIN_MODE_SERVO, // Pin mode
  ]
  port.write(Buffer.from(data))
  return Promise.resolve()
}
