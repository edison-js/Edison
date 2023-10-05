import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'
import { findArduinoPath } from './findArduinoPath'

export const board = new EventEmitter()

const setupBoard = async () => {
  const path = (await findArduinoPath()) as string
  const port = new SerialPort({ path, baudRate: 57600 })

  let isReadyEmitted = false

  port.on('data', () => {
    if (!isReadyEmitted) {
      board.emit('ready', port) // Emit 'ready' event with port as argument
      isReadyEmitted = true
    }
  })
}

setupBoard()
