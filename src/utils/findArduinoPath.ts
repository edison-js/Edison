import { SerialPort } from 'serialport'

export const findArduinoPath = async (): Promise<string | null> => {
  try {
    const ports = await SerialPort.list()
    for (const port of ports) {
      if (port.manufacturer && port.manufacturer.includes('Arduino')) {
        ////console.log(2)
        return port.path
      }
    }
    //There is no arduino board
    return null
  } catch (error) {
    console.error(
      'An error occurred while finding the Arduino port. Check your connection with your device:',
      error,
    )
    return null
  }
}
