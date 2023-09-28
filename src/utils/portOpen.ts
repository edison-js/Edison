import { SerialPort } from 'serialport'

export const portOpen = (path: string): SerialPort<any> => {
  const port = new SerialPort({ path, baudRate: 57600 })
  return port
}
