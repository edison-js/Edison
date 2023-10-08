import { SerialPort } from 'serialport'
import { AnalogPin, Sensor } from '../../../types/analog/analog'
import { analogPort } from '../analogPort'

export const attachSensor = (port: SerialPort, pin: AnalogPin) => {
  const pressureSensor = analogPort(port)(pin)
  let lastTriggered = 0 // 最後にイベントがトリガーされた時刻
  const MIN_INTERVAL = 1000 // イベントをトリガーする最小間隔（ミリ秒）

  return {
    pin,
    read: async (
      method: Sensor,
      func: () => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      return pressureSensor.read(method, async () => {
        const now = Date.now()
        if (now - lastTriggered >= MIN_INTERVAL) {
          lastTriggered = now
          await func()
        }
      })
    },
  }
}
