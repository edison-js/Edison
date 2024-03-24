import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'
import ora from 'ora'

const boardEmitter = new EventEmitter()
let currentPort: SerialPort | null = null
let isPortActive = false

const MAX_RECENT_LISTENERS = 6

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
    const port = new SerialPort(
      { path: arduinoPath, baudRate: 57600 },
      (error) => {
        if (error) {
          spinner.fail(
            'Failed to open port\n ' +
              error +
              `.\n ---------------------------------------------------------\nWSL: If you are using WSL, run the command
              \`\`\`sh
              ls/dev/tty*
              \`\`\`
----------------------------------------------------------
to see if the path you are passing to the "port" property of the <Board> component exists.\n
Windows: the "port" is the COMx uploaded to microconputar.`,
          )
          currentPort = null
          process.exit(1)
        }
      },
    )
    currentPort = port

    const onData = (/*data*/) => {
      const allListeners = port.listeners('data') as ((...args: []) => void)[]
      const oldListeners = allListeners.slice(0, -MAX_RECENT_LISTENERS)

      //console.log('data', port.listenerCount('data'))
      oldListeners.forEach((listener) => {
        if (listener !== onData) {
          port.removeListener('data', listener)
        }
      })

      if (!isPortActive) {
        clearTimeout(timeoutId)
        spinner.succeed('Device is connected successfully!')
        boardEmitter.emit('ready', port)
        isPortActive = true
      }
    }

    port.on('close', () => {
      spinner.fail('Board is closed.')
      currentPort = null
      port.removeAllListeners()
      isPortActive = false
      process.exit(1)
    })
    port.on('data', onData)
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
