import type { SerialPort } from 'serialport'
import { setInputState } from '../../helper/Input/setInputState'
import type { Sensor } from '../../types/analog/analog'

let prevValue: boolean | null = null

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    return {
      read: async (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setInputState(pin, port)

        observable.subscribe((value: boolean) => {
          if (prevValue !== value && value && method === 'off') {
            // console.log('off')
            prevValue = value
            func()
          }
          if (prevValue !== value && value === false && method === 'on') {
            // console.log('on')
            prevValue = value
            func()
          }
          if (method === 'change' && value !== prevValue) {
            func()
          }
        })
      },
    }
  }
}
