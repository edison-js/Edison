import type { SerialPort } from 'serialport'
import { setInputState } from '../../helper/Input/setInputState'
import type { Sensor } from '../../types/analog/analog'

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    let prevValue: boolean | null = null // 各ピンごとにprevValueを保持

    return {
      read: (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): void => {
        const observable = setInputState(pin, port)

        observable.subscribe((value: boolean) => {
          if (method === 'change') {
            if (value !== prevValue) {
              prevValue = value
              func()
            }
          } else if (method === 'off' && value && prevValue !== value) {
            prevValue = value
            func()
          } else if (method === 'on' && !value && prevValue !== value) {
            prevValue = value
            func()
          }
          // 'change'の場合は前の値との比較に関係なくfuncを実行
        })
      },
    }
  }
}
