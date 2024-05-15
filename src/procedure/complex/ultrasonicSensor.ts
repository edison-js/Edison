import { outputPort } from '../output/outputPort'
import { inputPort } from '../input/inputPort'
import { delay } from '../../index'
import type { SerialPort } from '../../index'
import type { Sensor } from '../types/analog/analog'

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
      await echo.read(method, async () => {
        await func()
      })

      // eslint-disable-next-line no-constant-condition
      while (true) {
        await trig.on()
        await delay(20)
        await trig.off()
        await delay(20)
      }
    },
  }
}
