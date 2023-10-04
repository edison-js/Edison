import { board } from '../utils/board'
import { createSensor } from '../factory/analog/uniqueDevice/pressierSensor'
import { SerialPort } from 'serialport'
import { createLed } from '../factory/output/uniqueDevice/led'

board.on('ready', (port: SerialPort) => {
  console.log('Board is ready!')
  const led1 = createLed(port, 12)
  const sensor1 = createSensor(port, 'A0')

  sensor1.read('on', function () {
    //console.log('this')
    led1.blink(500)
  })
})
