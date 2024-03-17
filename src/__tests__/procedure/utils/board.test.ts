import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EventEmitter } from 'events'
import { board } from '../../../procedure/utils/board'

let mockSerialPortInstance: EventEmitter & { listenerCount: unknown }

vi.mock('serialport', () => ({
  SerialPort: vi.fn().mockImplementation(({ path, baudRate }) => {
    const eventEmitter = new EventEmitter() as EventEmitter & {
      listenerCount?: unknown
    }
    eventEmitter.listenerCount = (eventName: string) => {
      return eventEmitter.listeners(eventName).length
    }
    mockSerialPortInstance = eventEmitter
    return {
      path,
      baudRate,
      on: eventEmitter.on.bind(eventEmitter),
      removeAllListeners: eventEmitter.removeAllListeners.bind(eventEmitter),
      listeners: eventEmitter.listeners.bind(eventEmitter),
      removeListener: eventEmitter.removeListener.bind(eventEmitter),
      emit: eventEmitter.emit.bind(eventEmitter),
      listenerCount: eventEmitter.listenerCount.bind(eventEmitter),
    }
  }),
}))

describe('board', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('connectManual should set isReady to true when the board is successfully connected', () => {
    expect(board.isReady()).toBe(false)
    board.connectManual('/dev/ttyUSB0')
    setTimeout(() => {
      mockSerialPortInstance.emit('data', 'test-data')
      expect(board.isReady()).toBe(true)
    }, 1)
  })

  it('should handle "close" event correctly', () => {
    board.connectManual('/dev/ttyUSB0')
    setTimeout(() => {
      mockSerialPortInstance.emit('close')
      setTimeout(() => {
        expect(board.isReady()).toBe(false)
      }, 1)
    }, 1)
  })
})
