import { board } from '../utils/board'
import { attachServo } from '../factory/servo/uniqueDevice/servo'
import { SerialPort } from 'serialport'

board.on('ready', async (port: SerialPort) => {
  //console.log('Board is ready!')
  const servo = attachServo(port, 8)
  await servo.rotate(50)
  await servo.rotate(150)
  await servo.rotate(50)
})
