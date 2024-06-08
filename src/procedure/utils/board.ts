import { EventEmitter } from 'events'
import { SerialPort } from 'serialport'
import ora from 'ora'
import { delay } from './delay'

const boardEmitter = new EventEmitter()
let currentPort: SerialPort | null = null
let isPortActive = false

const MAX_RECENT_LISTENERS = 2

const confirmConnection = async (port: SerialPort) => {
  const endTimeout = Date.now() + 10000

  while (Date.now() < endTimeout) {
    port.write(Buffer.from([0xf0, 0x79, 0xf7]))
    if (isPortActive) {
      break
    }
    await delay(100)
  }
}

const connectManual = async (path: string, baudRate: number) => {
  const spinner = ora('Now Connecting to Device...').start()

  if (currentPort) {
    spinner.fail('Port is already used.')
    process.exit(1)
  }

  try {
    const port = new SerialPort({ path, baudRate }, (error) => {
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
Windows: the "port" is the COMx uploaded to microcomputer.`,
        )
        currentPort = null
        process.exit(1)
      }
    })

    currentPort = port

    const onData = () => {
      if (!isPortActive) {
        spinner.succeed('Device is connected successfully!')
        boardEmitter.emit('ready', port)
        isPortActive = true
      }

      const allListeners = port.listeners('data') as ((...args: []) => void)[]
      const oldListeners = allListeners.slice(0, -MAX_RECENT_LISTENERS)

      //console.log('data', port.listenerCount('data'))
      oldListeners.forEach((listener) => {
        if (listener !== onData) {
          port.removeListener('data', listener)
        }
      })
    }
    port.on('data', onData)

    port.on('close', () => {
      spinner.fail('Port is closed.')
      currentPort = null
      port.removeAllListeners()
      isPortActive = false
      process.exit(1)
    })

    port.on('error', (error) => {
      console.error('Serial port error:', error)
    })

    await confirmConnection(port)

    if (!isPortActive) {
      spinner.fail('Failed to connect to device within 10 seconds.')
      process.exit(1)
    }
  } catch (error) {
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
