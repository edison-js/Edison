import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'

const boardEmitter = new EventEmitter()
let currentPort: SerialPort | null = null
let isPortActive = false

const MAX_RECENT_LISTENERS = 2

const connectManual = (arduinoPath: string) => {
  if (currentPort) {
    console.log('Port is already open.')
    return
  }

  try {
    const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })
    currentPort = port

    const onData = (/*data*/) => {
      if (port.listenerCount('data') > MAX_RECENT_LISTENERS) {
        const allListeners = port.listeners('data') as ((
          ...args: unknown[]
        ) => void)[]
        const oldListeners = allListeners.slice(0, -MAX_RECENT_LISTENERS)

        // biome-ignore lint/complexity/noForEach: <explanation>
        oldListeners.forEach((listener) => {
          if (listener !== onData) {
            port.removeListener('data', listener)
          }
        })
      }

      if (!isPortActive) {
        console.log('Board is ready.')
        boardEmitter.emit('ready', port)
        isPortActive = true
      }
    }

    port.on('data', onData)

    port.on('close', () => {
      currentPort = null
      port.removeAllListeners()
      isPortActive = false
    })
  } catch (error) {
    console.error('Failed to open port:', error)
    currentPort = null
  }
}

export const board = {
  on: boardEmitter.on.bind(boardEmitter),
  off: boardEmitter.off.bind(boardEmitter),
  connectManual,
  getCurrentPort: () => currentPort,
  isReady: () => isPortActive,
}
