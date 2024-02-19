import type { SerialPort } from 'serialport'

export const bufferAnalog = (
  port: SerialPort,
  buffer: Buffer,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    port.write(buffer, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
