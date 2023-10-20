import { SerialPort } from 'serialport'
import { bufferWrite } from '../Utils/bufferWrite'

const SET_PIN_MODE = 0xf4
const INPUT_MODE = 0x00
const DIGITAL_CHANGE_MESSAGE = 0xd0

export const setInputState = async (pin: number, port: SerialPort) => {
  const buffer = Buffer.from([SET_PIN_MODE, pin, INPUT_MODE])
  // Calculate the port number from the pin number, port is grouped by 8 pins
  const portNumber = Math.floor(pin / 8)
  // which pin in the port
  const positionInPort = pin % 8
  const buffer2 = Buffer.from([DIGITAL_CHANGE_MESSAGE + portNumber, 1])
  await bufferWrite(port, buffer)
  await bufferWrite(port, buffer2)

  port.on('data', (data) => {
    console.log('Received from Arduino:', data)

    // if 8th pin, check the first bit of the second byte
    if (positionInPort === 7) {
      if ((data[2] & 0x01) === 1) {
        console.log(`Pin ${pin} is OFF`)
      } else {
        console.log(`Pin ${pin} is ON`)
      }
    } else {
      // if not 8th pin, check the other bit
      if ((data[1] & (1 << positionInPort)) !== 0) {
        //console.log(`Pin ${pin} is ON`)
      } else {
        //console.log(`Pin ${pin} is OFF`)
      }
    }
  })
}
