import { outputPort } from '../output/outputPort'
import { inputPort } from '../input/inputPort'
import { delay } from '../../../index'
import type { SerialPort } from '../../../index'
import type { Sensor } from '../../types/analog/analog'

export const attachUltrasonicSensor = (
  port: SerialPort,
  trigPin: number,
  echoPin: number,
) => {
  const trig = outputPort(port)(trigPin)
  const echo = inputPort(port)(echoPin)

  return {
    measure: async (
      method: Sensor,
      func: () => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      // echo.readを一度だけ呼び出し
      await echo.read(method, async () => {
        await func()
      })

      // 無限ループでTrigのon/offのみを繰り返す
      while (true) {
        //console.log('Trig')
        await trig.on() // TrigピンをHIGHにする
        await delay(20)
        await trig.off() // TrigピンをLOWにする
        await delay(20) // 次の測定までの待機時間
      }
    },
  }
}
