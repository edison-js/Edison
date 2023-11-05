// board.ts

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

  const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })

  port.on('data', (data) => {
    if (!isReadyEmitted) {
      boardEmitter.emit('ready', port)
      isReadyEmitted = true
    }
  })
  console.log(3)
}

const connectManual = (arduinoPath: string) => {
  const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })

  port.on('data', (data) => {
    if (!isReadyEmitted) {
      boardEmitter.emit('ready', port)
      isReadyEmitted = true
    }
  })
}

export const board = {
  on: boardEmitter.on.bind(boardEmitter),
  off: boardEmitter.off.bind(boardEmitter), // Adding the off method
  connectAutomatic,
  connectManual,
}

//
//connectAutomatic()
