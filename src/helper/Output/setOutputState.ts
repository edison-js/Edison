import { SerialPort } from 'serialport'
import { setPinOutput } from './setPinOutput'
import { bufferWrite } from '../Utils/bufferWrite'
import { delay } from '../../utils/delay'

export const setOutputState = async (
  pin: number,
  onoff: boolean,
  port: SerialPort,
) => {
  const IOMESSAGE = 0x90

  const on = async (): Promise<void> => {
    await setPinOutput(pin, port)
    const bufferValue = 1 << (pin & 0x07)
    const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00])
    await bufferWrite(port, buffer)
    //console.log('on')
    return
  }

  const off = async (): Promise<void> => {
    await setPinOutput(pin, port)
    const bufferValue = 1 << 0x00
    const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00])
    await bufferWrite(port, buffer)
    //console.log('off')
    return
  }

  if (onoff) {
    on()
    await delay(20)
  } else {
    off()
    await delay(20)
  }
}
