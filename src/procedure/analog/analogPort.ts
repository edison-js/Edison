import type { SerialPort } from 'serialport'
import { setAnalogState } from '../uniqueDevice/setAnalogState'
import type { AnalogPin, Sensor } from '../types/analog/analog'
import { analogPinMapping } from '../types/analog/analog'
import type { Subscription } from 'rxjs'

export const analogPort = (port: SerialPort) => {
  return (analogPin: AnalogPin) => {
    const pin = analogPinMapping[analogPin]
    let subscription: Subscription
    let prevValue: boolean | undefined

    return {
      read: async (
        method: Sensor,
        func: (
          value: number,
        ) => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setAnalogState(pin, port)

        subscription = observable.subscribe((value: boolean) => {
          if (prevValue !== undefined) {
            // first emit will be skipped
            if (value && method === 'on') {
              func(Number(value))
            } else if (value === false && method === 'off') {
              func(Number(value))
            } else if (method === 'change' && value !== prevValue) {
              // is value changed?
              func(Number(value))
            }
          }
          prevValue = value
        })
      },
      stop: () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      },
    }
  }
}
