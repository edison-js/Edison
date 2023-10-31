import { attachOutput } from '../factory/output/uniqueDevice/output'
import { board } from '../utils/board'
import { SerialPort } from 'serialport'

board.connectManual('/dev/ttyUSB0')

board.on('ready', (port: SerialPort) => {
  //console.log('Board is ready!')
  const led = attachOutput(port, 12)
  led.on()
})
