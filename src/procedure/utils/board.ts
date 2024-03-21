import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'
import ora from 'ora'

const boardEmitter = new EventEmitter()
let currentPort: SerialPort | null = null
let isPortActive = false

const MAX_RECENT_LISTENERS = 80

const connectManual = (arduinoPath: string) => {
  const spinner = ora('Now Connecting to Device...').start()

  if (currentPort) {
    spinner.fail('Port is already used.')
    process.exit(1)
  }
  const timeoutId = setTimeout(() => {
    if (!isPortActive) {
      spinner.fail('Failed to connect to device within 10 seconds.')
      process.exit(1)
    }
  }, 10000)

  try {
    const port = new SerialPort({ path: arduinoPath, baudRate: 57600 })
    currentPort = port

    const onData = (/*data*/) => {
      if (port.listenerCount('data') > MAX_RECENT_LISTENERS) {
        const allListeners = port.listeners('data') as ((...args: []) => void)[]
        const oldListeners = allListeners.slice(0, -MAX_RECENT_LISTENERS)

        oldListeners.forEach((listener) => {
          if (listener !== onData) {
            port.removeListener('data', listener)
          }
        })
      }

      if (!isPortActive) {
        clearTimeout(timeoutId)
        spinner.succeed('Device is connected successfully!')
        boardEmitter.emit('ready', port)
        isPortActive = true
      }
    }

    port.on('data', onData)
    port.on('close', () => {
      spinner.fail('Board is closed.')
      currentPort = null
      port.removeAllListeners()
      isPortActive = false
    })
  } catch (error) {
    clearTimeout(timeoutId)
    spinner.fail('Failed to open port: ' + error)
    currentPort = null
    process.exit(1)
  }
}

export const board = {
  on: boardEmitter.on.bind(boardEmitter),
  off: boardEmitter.off.bind(boardEmitter),
  connectManual,
  getCurrentPort: () => currentPort,
  isReady: () => isPortActive,
}
