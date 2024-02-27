import type { SerialPort } from 'serialport'
import { bufferWrite } from '../Utils/bufferWrite'

export const setAnalogOutput = async (
  pin: number,
  value: number,
  port: SerialPort,
) => {
  const ANALOG_MESSAGE = 0xe0

  const buffer = Buffer.from([
    ANALOG_MESSAGE + pin,
    value & 0x7f,
    (value >> 7) & 0x7f,
  ])

  await bufferWrite(port, buffer)
}
