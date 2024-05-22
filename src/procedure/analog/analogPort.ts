// analogPort.ts
import type { SerialPort } from 'serialport'
import { Observable } from 'rxjs'
import type { AnalogPin, Sensor } from '../types/analog/analog'
import { analogPinMapping } from '../types/analog/analog'
import type { Subscription } from 'rxjs'

export const analogPort = (port: SerialPort) => {
  return (analogPin: AnalogPin) => {
    const pin = analogPinMapping[analogPin]
    let subscription: Subscription
    let prevValue: number | undefined
    const currentValue: number = 0

    const setAnalogState = () => {
      const REPORT_ANALOG = 0xc0
      const ANALOG_MESSAGE = 0xe0

      return new Observable<number>((observer) => {
        const buffer = Buffer.from([REPORT_ANALOG | pin, 1])
        port.write(buffer)

        const onData = (data: Buffer) => {
          if ((data[0] & 0xf0) === ANALOG_MESSAGE && pin === (data[0] & 0x0f)) {
            const value = data[1] | (data[2] << 7)
            observer.next(value)
          }
        }
        port.on('data', onData)

        return () => {
          port.off('data', onData)
        }
      })
    }

    return {
      read: async (
        method: Sensor,
        func: (
          value: number,
        ) => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setAnalogState()

        subscription = observable.subscribe((value: number) => {
          if (prevValue !== undefined) {
            // first emit will be skipped
            if (value && method === 'on') {
              func(Number(value))
            } else if (value === 0 && method === 'off') {
              func(Number(value))
            } else if (method === 'change' && value !== prevValue) {
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
      getValue: () => currentValue,
    }
  }
}
