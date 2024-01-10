import { Sensor } from '../../../types/analog/analog'
import { inputPort } from '../inputPort'
import type { SerialPort } from 'serialport'

export const attachButton = (port: SerialPort, pin: number) => {
  const pushButton = inputPort(port)(pin)

  return {
    read: async (
      method: Sensor,
      func: () => Promise<void> | Promise<number> | void | number,
    ): Promise<void> => {
      return pushButton.read(method, async () => {
        await func()
      })
    },
  }
}
