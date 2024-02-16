import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'
import { findArduinoPath } from './findArduinoPath'

const boardEmitter = new EventEmitter()

let isReadyEmitted = false

let globalPort: SerialPort | null = null

const connectAutomatic = async () => {
  const arduinoPath = await findArduinoPath()
  if (!arduinoPath) {
    console.error('Could not find the path for the genuine Arduino.')
    return
  }

  const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })

  port.on('data', (/*data*/) => {
    if (!isReadyEmitted) {
      boardEmitter.emit('ready', port)
      isReadyEmitted = true
    }
  })
}

const connectManual = (arduinoPath: string) => {
  if (globalPort?.isOpen) {
    console.log('Port is already open.')
    return
  }

  const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })

  port.on('data', (/*data*/) => {
    if (!isReadyEmitted) {
      boardEmitter.emit('ready', port)
      isReadyEmitted = true
    }
  })

  globalPort = port
}

export const board = {
  on: boardEmitter.on.bind(boardEmitter),
  connectAutomatic,
  connectManual,
}
