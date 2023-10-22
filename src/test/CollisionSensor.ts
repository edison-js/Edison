import { attachCollisionSensor } from '../factory/input/uniqueDevice/collisionSensor'
import { board } from '../utils/board'
import { SerialPort } from 'serialport'

board.connectManual('/dev/ttyUSB0')

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const collisionSensor = attachCollisionSensor(port, 12)
  collisionSensor.on()
})
