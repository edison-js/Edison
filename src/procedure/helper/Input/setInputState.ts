import type { SerialPort } from 'serialport'
import { bufferWrite } from '../Utils/bufferWrite'
import type { Observable } from 'rxjs'
import { fromEventPattern } from 'rxjs'
import { distinctUntilChanged, filter, map } from 'rxjs/operators'
import { Buffer } from 'node:buffer'

const SET_PIN_MODE = 0xf4
const INPUT_MODE = 0x00
const DIGITAL_CHANGE_MESSAGE = 0xd0

export const setInputState = (
  pin: number,
  port: SerialPort,
): Observable<boolean> => {
  bufferWrite(port, Buffer.from([SET_PIN_MODE, pin, INPUT_MODE]))
  bufferWrite(
    port,
    Buffer.from([DIGITAL_CHANGE_MESSAGE + Math.floor(pin / 8), 1]),
  )

  return fromEventPattern<Buffer>(
    (handler) => port.on('data', handler),
    (handler) => port.removeListener('data', handler),
  ).pipe(
    map((data) => (data.length <= 3 ? data : data.subarray(0, 3))),
    filter((data) => (data[0] & 0x0f) === Math.floor(pin / 8)),
    map((data) => ((data[1] >> pin % 8) & 1) === 1),
    distinctUntilChanged(),
  )
}
