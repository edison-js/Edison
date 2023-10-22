import { board } from '../utils/board'
import { SerialPort } from 'serialport'
import { attachPhotoInterrupter } from '../factory/input/uniqueDevice/photoInterrupter'

board.connectManual('/dev/ttyUSB0')

board.on('ready', async (port: SerialPort) => {
  console.log('Board is ready!')
  const photoInterrupter = attachPhotoInterrupter(port, 12)
  await photoInterrupter.on()
})
