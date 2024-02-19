import type { SerialPort } from 'serialport'
import { setOutputState } from '../../helper/Output/setOutputState'
import { setAnalogOutput } from '../../helper/Output/setAnalogOutput'

export const outputPort = (port: SerialPort) => {
  return (pin: number) => {
    return {
      on: async () => {
        await setOutputState(pin, true, port)
      },
      off: async () => {
        await setOutputState(pin, false, port)
      },
      analogWrite: async (value: number) => {
        await setAnalogOutput(pin, value, port)
      },
    }
  }
}
