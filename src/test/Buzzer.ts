import { board } from '../utils/board'
import { attachBuzzer } from '../factory/output/uniqueDevice/buzzer'
import { SerialPort } from 'serialport'

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const buzzer = attachBuzzer(port, 12)
  buzzer.on()
})
