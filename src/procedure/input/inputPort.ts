import type { SerialPort } from 'serialport'
import { setInputState } from '../helper/Input/setInputState'
import type { Sensor } from '../types/analog/analog'

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    let prevValue: boolean = false

    return {
      read: (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): void => {
        const observable = setInputState(pin, port)

        observable.subscribe((value: boolean) => {
          if (method === 'change' && value !== prevValue) {
            prevValue = value
            func()
          }
          if (method === 'off' && !value && prevValue !== value) {
            prevValue = value
            func()
          }
          if (method === 'on' && value && prevValue !== value) {
            prevValue = value
            func()
          }
        })
      },
    }
  }
}
