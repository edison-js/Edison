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
    let buffer = Buffer.alloc(0) // Initialize an empty buffer
    let isObserver = false // Prevent events from firing in succession.

    port.on('data', (data) => {
      // Check if the new data starts with 0x91 or 0x90, if so, reset the buffer
      if (data.length > 0 && (data[0] === 0x91 || data[0] === 0x90)) {
        buffer = data // Reset buffer with new data
      } else {
        buffer = Buffer.concat([buffer, data]) // Append new data to the existing buffer
      }

      // Process complete messages in the buffer
      if (
        ((buffer[0] === 0x90 && pin < 8) || (buffer[0] === 0x91 && pin >= 8)) &&
        buffer.length === 3
      ) {
        if (buffer[1] & (1 << pin % 8) && isObserver === true) {
          isObserver = false
          observer.next(false)
        } else if (isObserver === false) {
          isObserver = true
          observer.next(true)
        }
      }
    })
  })
}
