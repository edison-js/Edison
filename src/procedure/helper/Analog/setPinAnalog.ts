import type { SerialPort } from 'serialport'

export const setPinAnalog = (pin: number, port: SerialPort): Promise<void> => {
  const SET_PIN_MODE = 0xf4
  // const REPORT_ANALOG = 0xc0 // Enable analog reporting for pin
  // const ANALOG_MESSAGE = 0xe0 // Analog message command
  return new Promise((resolve, reject) => {
    const setPinModeOutput = Buffer.from([SET_PIN_MODE, pin, 2])
    port.write(setPinModeOutput, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
