import { board } from '../utils/board'
import { SerialPort } from 'serialport'
import { attachPirMorionSensor } from '../factory/input/uniqueDevice/pirMotionSensor'

board.connectManual('/dev/ttyUSB0')

board.on('ready', async (port: SerialPort) => {
  console.log('Board is ready!')
  const pirMotionSensor = attachPirMorionSensor(port, 12)
  await pirMotionSensor.on()
})
