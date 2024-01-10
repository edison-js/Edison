import type { SerialPort } from 'serialport'
import { setInputState } from '../../helper/Input/setInputState'
import { Subscription } from 'rxjs'
import { Sensor } from '../../types/analog/analog'
import microtime from 'microtime'

export const inputPort = (port: SerialPort) => {
  return (pin: number) => {
    let subscription: Subscription
    let prevValue: boolean
    // let startTime: number
    // let endTime: number

    return {
      read: async (
        method: Sensor,
        func: () => Promise<void> | Promise<number> | void | number,
      ): Promise<void> => {
        const observable = setInputState(pin, port)

        subscription = observable.subscribe((value: boolean) => {
          //console.log('value: ', value, 'prevValue: ', prevValue)
          const currentTime = microtime.now() // 現在の時刻を取得

          if (typeof prevValue !== 'undefined') {
            // first emit will be skipped
            if (value && method === 'on') {
              func()
            } else if (value === false && method === 'off') {
              //console.log(value)
              func()
            } else if (method === 'change' && value !== prevValue) {
              // is value changed?
              func()
            }
            /*
            else if (method === 'sonic' && value !== prevValue) {
              if (value && !prevValue) {
                // EchoピンがLOWからHIGHに変わった瞬間
                startTime = currentTime
              } else if (!value && prevValue) {
                // EchoピンがHIGHからLOWに変わった瞬間
                endTime = currentTime

                // 時間差を計算（パルス幅）
                const pulseWidth = endTime - startTime
                console.log(`Pulse Width: ${pulseWidth} us`)
                // 往復距離を半分にして距離を計算
                const distance = ((pulseWidth / 2) * 340 * 100) / 1000000 // 音速を340m/sに設定
                console.log(`Distance: ${distance} cm`)

                // funcに距離を渡す
                //func(distance)
              }
            }
            */
          }
          prevValue = value
        })
      },
    }
  }
}
