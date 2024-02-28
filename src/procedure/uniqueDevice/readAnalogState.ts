import type { SerialPort } from 'serialport'
import { Observable } from 'rxjs'

export const readAnarogState = (port: SerialPort) => {



    return new Observable<number>((observer) => {
        port.on('data', (data: Buffer) => {
          const value = data[1] | (data[2] << 7)

            observer.next(value)
        } )

      
  })
}
