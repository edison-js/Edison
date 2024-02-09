import type { SerialPort } from 'serialport'
import { bufferWrite } from '../Utils/bufferWrite'

const SET_PIN_MODE = 0xf4
const PWM_MODE = 0x03
const ANALOG_MESSAGE = 0xe0

export const setPwmState = async (
  pin: number,
  value: number,
  port: SerialPort,
) => {
  const modeBuffer = Buffer.from([SET_PIN_MODE, pin, PWM_MODE])
  await bufferWrite(port, modeBuffer)
  const pwmBuffer = Buffer.from([
    ANALOG_MESSAGE | (pin & 0x0f),
    value & 0x7f,
    (value >> 7) & 0x7f,
  ])
  await bufferWrite(port, pwmBuffer)
}
