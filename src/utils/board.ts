import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'
import { findArduinoPath } from './findArduinoPath'

const boardEmitter = new EventEmitter()

let isReadyEmitted = false

const connectAutomatic = async () => {
  const arduinoPath = await findArduinoPath()
  if (!arduinoPath) {
    console.error('Could not find the path for the genuine Arduino.')
    return
  }

  //  console.log('Arduino path: ', arduinoPath)
  const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })

  port.on('data', (data) => {
    //    console.log('Data received!: ', data)
    if (!isReadyEmitted) {
      boardEmitter.emit('ready', port)
      isReadyEmitted = true
    }
  })
}

const connectManual = (arduinoPath: string) => {
  //  console.log('Arduino path: ', arduinoPath)
  const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })

  port.on('data', (data) => {
    //  console.log('Data received!: ', data)
    if (!isReadyEmitted) {
      boardEmitter.emit('ready', port)
      isReadyEmitted = true
    }
  })
}

export const board = {
  on: boardEmitter.on.bind(boardEmitter),
  connectAutomatic,
  connectManual,
}

//
connectAutomatic()
