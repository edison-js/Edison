import { SerialPort } from 'serialport'
import { bufferAnalog } from '../helper/Analog/bufferAnalog'
import { Observable } from 'rxjs'

export const setAnalogState = (pin: number, port: SerialPort) => {
  const REPORT_ANALOG = 0xc0
  const ANALOG_MESSAGE = 0xe0
  const CONSECUTIVE_ZEROES = 7 // 連続ゼロのカウント数

  let zeroCount = 0 // 連続ゼロのカウントを保持する変数

  return new Observable<boolean>((observer) => {
    const buffer = Buffer.from([REPORT_ANALOG | pin, 1])
    bufferAnalog(port, buffer)

    const onData = (data: Buffer) => {
      if ((data[0] & 0xf0) === ANALOG_MESSAGE) {
        const pin = data[0] & 0x0f
        if (pin === 0) {
          const value = data[1] | (data[2] << 7)
          // is 0 consecutive?
          if (value < 10) {
            zeroCount++
            if (zeroCount >= CONSECUTIVE_ZEROES) {
              observer.next(true)
              zeroCount = 0 // reset Count
            }
          } else {
            zeroCount = 0 // if not consecutive, reset Count
          }
        }
      }
    }
    port.on('data', onData)

    return () => {
      port.off('data', onData)
    }
  })
}
