import { board } from '../utils/board'
import { attachRgbLed } from '../factory/output/uniqueDevice/rgbLed' // 新しいファクトリ関数をインポート
import { SerialPort } from 'serialport'

board.connectManual('/dev/ttyUSB0')

board.on('ready', async (port: SerialPort) => {
  console.log('Board is ready!')

  // RGB LEDをピン 9, 10, 11に接続
  const rgbLed = attachRgbLed(port, 9, 10, 11)

  // 色をセット (例: 赤色)
  await rgbLed.setColor(255, 0, 0)

  // 1秒待機
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 色をセット (例: 緑色)
  await rgbLed.setColor(0, 255, 0)

  // 1秒待機
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // LEDをオフにする
  await rgbLed.off()
})
