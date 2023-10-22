import { inputPort } from '../inputPort'
import { SerialPort } from 'serialport'

export const attachHallEffectSensor = (port: SerialPort, pin: number) => {
  const hallEffectSensor = inputPort(port)(pin)

  return {
    on: async () => {
      await hallEffectSensor.read()
    },
  }
}
