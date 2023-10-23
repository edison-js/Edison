import { SerialPort } from 'serialport'
import { bufferWrite } from '../Utils/bufferWrite'
import { Observable } from 'rxjs'

const SET_PIN_MODE = 0xf4
const INPUT_MODE = 0x00
const DIGITAL_CHANGE_MESSAGE = 0xd0

export const setInputState = (
  pin: number,
  port: SerialPort,
): Observable<boolean> => {
  const buffer = Buffer.from([SET_PIN_MODE, pin, INPUT_MODE])
  const portNumber = Math.floor(pin / 8)

  const buffer2 = Buffer.from([DIGITAL_CHANGE_MESSAGE + portNumber, 1])
  bufferWrite(port, buffer)
  bufferWrite(port, buffer2)

  return new Observable<boolean>((observer) => {
    port.on('data', (data) => {
      console.log(data)
      //pin groupings are 8 pins per port
      //port 0: pins 0-7
      if ((data[0] === 0x90 && pin < 8) || (data[0] === 0x91 && pin >= 8)) {
        if (data[1] & (1 << pin % 8)) {
          observer.next(false)
        } else {
          observer.next(true)
        }
      } else {
        observer.next(false)
      }
    })
  })
}
