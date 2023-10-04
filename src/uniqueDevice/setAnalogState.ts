import { SerialPort } from 'serialport'
import { bufferAnalog } from '../helper/Analog/bufferAnalog'
import { Observable } from 'rxjs'

export const setAnalogState = (pin: number, port: SerialPort) => {
  const REPORT_ANALOG = 0xc0
  const ANALOG_MESSAGE = 0xe0
  const CONSECUTIVE_ON = 7
  const CONSSECUTIVE_OFF = 7

  let onCount = 0
  let offCount = 0
  return new Observable<boolean>((observer) => {
    const buffer = Buffer.from([REPORT_ANALOG | pin, 1])
    bufferAnalog(port, buffer)

    /* The funcc is deffered to the setup func. This onData func is assured to be called after the sensor is ready */
    const onData = (data: Buffer) => {
      if ((data[0] & 0xf0) === ANALOG_MESSAGE) {
        const pinData = data[0] & 0x0f
        if (pin === pinData) {
          const value = data[1] | (data[2] << 7)
          //console.log(value)
          // is 0 consecutive?
          if (value < 10) {
            onCount++
            offCount = 0
            if (onCount >= CONSECUTIVE_ON) {
              observer.next(true)
              onCount = 0 // reset Count
            }
          } else {
            offCount++
            onCount = 0 // if not consecutive, reset Count
            if (offCount >= CONSSECUTIVE_OFF) {
              observer.next(false)
              offCount = 0 // reset Count
            }
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
