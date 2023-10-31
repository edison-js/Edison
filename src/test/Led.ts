import { board } from '../utils/board'
import { attachLed } from '../factory/output/uniqueDevice/led'
import { SerialPort } from 'serialport'

board.connectManual('/dev/ttyUSB0')

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const led = attachLed(port, 13)
  led.blink(500)
})
