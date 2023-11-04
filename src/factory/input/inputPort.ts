import { SerialPort } from 'serialport'
import { setInputState } from '../../helper/Input/setInputState'
import { Subscription } from 'rxjs'
import { Sensor } from '../../types/analog/analog'

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    let subscription: Subscription
    let prevValue: boolean

    return {
      read: async (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setInputState(pin, port)

        subscription = observable.subscribe((value: boolean) => {
          if (typeof prevValue !== 'undefined') {
            // first emit will be skipped
            if (value && method === 'on') {
              func()
            } else if (value === false && method === 'off') {
              //console.log(value)
              func()
            } else if (method === 'change' && value !== prevValue) {
              // is value changed?
              //console.log('change')
              func()
            }
          }
          prevValue = value
        })
      },
    }
  }
}
