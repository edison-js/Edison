import type { SerialPort } from 'serialport'
import { attachLed } from '../factory/output/uniqueDevice/led'
import { board } from '../utils/board'
import { attachHallEffectSensor } from '../factory/input/uniqueDevice/hallEffectSensor'

board.connectManual('/dev/ttyUSB0')

board.on('ready', (port: SerialPort) => {
  //console.log('Board is ready!')
  const led1 = attachLed(port, 13)

  const hallEffectSensor = attachHallEffectSensor(port, 12)
  hallEffectSensor.read('on', () => {
    led1.on()
  })
})
