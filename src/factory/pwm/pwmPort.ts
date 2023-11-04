import { SerialPort } from 'serialport'
import { setPwmState } from '../../helper/PWM/setPwmState'

export const pwmPort = (port: SerialPort) => {
  return (pin: number) => {
    return {
      analogWrite: async (value: number) => {
        await setPwmState(pin, value, port)
      },
      off: async () => {
        await setPwmState(pin, 0, port)
      },
    }
  }
}
