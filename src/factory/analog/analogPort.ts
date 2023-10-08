import { SerialPort } from 'serialport'
import { setAnalogState } from '../../uniqueDevice/setAnalogState'
import { AnalogPin, Sensor, analogPinMapping } from '../../types/analog/analog'
import { Subscription } from 'rxjs'

export const analogPort = (port: SerialPort) => {
  return (analogPin: AnalogPin) => {
    const pin = analogPinMapping[analogPin]
    let subscription: Subscription
    let prevValue: boolean

    return {
      read: async (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setAnalogState(pin, port)

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
      stop: () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      },
    }
  }
}
