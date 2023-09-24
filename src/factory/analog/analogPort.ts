import { SerialPort } from 'serialport'
import { setAnalogState } from '../../uniqueDevice/setAnalogState'
import { AnalogPin, analogPinMapping } from '../../types/analog/analog'
import { Subscription } from 'rxjs'

export const analogPort = (port: SerialPort) => {
  return (analogPin: AnalogPin) => {
    const pin = analogPinMapping[analogPin]
    let subscription: Subscription

    return {
      read: async (
        func: () => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setAnalogState(pin, port)
        subscription = observable.subscribe((value) => {
          if (value) {
            // pretter?
            console.log(value)
            func()
          } else {
            // if not prettier
            console.log(value)
          }
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
