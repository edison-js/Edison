import { board } from '../utils/board'
import { SerialPort } from 'serialport'
import { delay } from '../utils/delay'
import { attachPassiveBuzzer } from '../factory/pwm/uniqueDevice/passiveBuzzer'

board.connectManual('/dev/ttyUSB0')

board.on('ready', async (port: SerialPort) => {
  console.log('Board is ready!')
  //red, green, blue, vcc or gnd
  const passiveBuzzer = attachPassiveBuzzer(port, 3)
  passiveBuzzer.sound(500)
  await delay(1000)
})
