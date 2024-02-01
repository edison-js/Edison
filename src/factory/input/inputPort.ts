import type { SerialPort } from 'serialport'
import { setInputState } from '../../helper/Input/setInputState'
import type { Sensor } from '../../types/analog/analog'

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    let prevValue: boolean

    return {
      read: async (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setInputState(pin, port)

        observable.subscribe((value: boolean) => {
          if (value && method === 'off') {
            func()
          }
          if (value === false && method === 'on') {
            func()
          }
          if (method === 'change' && value !== prevValue) {
            func()
          }
          prevValue = value
        })
      },
    }
  }
}
