import { SerialPort } from 'serialport'

export const bufferWrite = (
  port: SerialPort,
  buffer: Buffer,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    port.write(buffer, (err) => {
      if (err) {
        //console.log('Error on write: ', err.message);
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
