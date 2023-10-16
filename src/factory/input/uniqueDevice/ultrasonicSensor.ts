import { SerialPort } from 'serialport'
import { delay } from '../../../utils/delay'
import { outputPort } from '../../output/outputPort'
import { inputPort } from '../inputPort'

export const attachUltrasonicSensor = (port: SerialPort, pin: number) => {
  const trigEchoPin = {
    setMode: async (mode: 'input' | 'output') => {
      if (mode === 'output') {
        await outputPort(port)(pin).off() // Initialize to LOW
      } else {
        await inputPort(port)(pin)
      }
    },
    read: async () => {
      return await inputPort(port)(pin).read()
    },
    write: async (state: boolean) => {
      await outputPort(port)(pin)[state ? 'on' : 'off']()
    },
  }

  return {
    measure: async (): Promise<number> => {
      // Set mode to OUTPUT for triggering
      await trigEchoPin.setMode('output')
      await delay(5)

      // Send 10us pulse to trigger
      await trigEchoPin.write(true)
      await delay(10)
      await trigEchoPin.write(false)

      // Set mode to INPUT for reading echo
      await trigEchoPin.setMode('input')
      /*
      // Measure the length of the echo signal
      const startTime = Date.now()
      while (!(await trigEchoPin.read())) {
        if (Date.now() - startTime > 1000) {
          throw new Error('Sensor timeout!')
        }
      }
      const signalStartTime = Date.now()
      while (await trigEchoPin.read()) {
        if (Date.now() - signalStartTime > 1000) {
          throw new Error('Sensor timeout!')
        }
      }
      */
      const signalEndTime = Date.now()

      //      const duration = signalEndTime - signalStartTime

      // Calculate distance in centimeters
      // const distance = ((duration / 1000) * 34300) / 2

      return //distance
    },
  }
}
