import { board } from '../utils/board'
import type { SerialPort } from 'serialport'
import { delay } from '../utils/delay'
import { attachVibrationSensor } from '../factory/pwm/uniqueDevice/vibrationSensor'

board.connectManual('/dev/ttyUSB0')

board.on('ready', async (port: SerialPort) => {
  //console.log('Board is ready!')

  const vibrationSensor = attachVibrationSensor(port, 3)
  await vibrationSensor.write(200)
  await delay(1000)
})
