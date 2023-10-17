import { SerialPort } from 'serialport'
import { setInputState } from '../../helper/Input/setInputState'

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    return {
      read: async () => {
        return await setInputState(pin, port)
      },
    }
  }
}
