import { SerialPort } from 'serialport'
import { attachCollisionSensor } from '../factory/input/uniqueDevice/collisionSensor'
import { attachLed } from '../factory/output/uniqueDevice/led'
import { board } from '../utils/board'

board.connectManual('/dev/ttyUSB0')

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const led1 = attachLed(port, 13)

  const collisionSensor = attachCollisionSensor(port, 12)
  collisionSensor.read('on', () => {
    led1.on()
  })
})
