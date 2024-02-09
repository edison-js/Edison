import { SerialPort } from 'serialport'

export const findArduinoPath = async (): Promise<string | null> => {
  try {
    const ports = await SerialPort.list()
    for (const port of ports) {
      //  console.log(port)
      if (port.manufacturer?.includes('Arduino')) {
        ////console.log(2)
        //  console.log('Arduino found at: ', port.path)
        return port.path
      }
    }
    //There is no arduino board
    return null
  } catch (error) {
    //  console.log(1)
    console.error(
      'An error occurred while finding the Arduino port. Check your connection with your device:',
      error,
    )
    return null
  }
}
