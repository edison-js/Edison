import { board } from '../utils/board'
import { attachPressureSensor } from '../factory/analog/uniqueDevice/pressureSensor'
import { SerialPort } from 'serialport'
import { attachLed } from '../factory/output/uniqueDevice/led'

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const led1 = attachLed(port, 12)
  const sensor1 = attachPressureSensor(port, 'A0')

  sensor1.read('on', () => {
    led1.blink(500)
  })
})
