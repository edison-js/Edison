import { board } from '../utils/board'
import { createLed } from '../factory/output/uniqueDevice/led'
import { SerialPort } from 'serialport'

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const led = createLed(port, 12)
  led.blink(500)
})
