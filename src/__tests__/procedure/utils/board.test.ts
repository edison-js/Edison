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
      // listenerCountの挙動を模擬
      return eventEmitter.listeners(eventName).length
    }
    mockSerialPortInstance = eventEmitter // 生成されたインスタンスを保持
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
    // currentPortのリセット処理はここで直接行うことはできない
  })

  it('connectManual should set isReady to true when the board is successfully connected', () => {
    expect(board.isReady()).toBe(false)
    board.connectManual('/dev/ttyUSB0')
    // `boardEmitter`が`ready`イベントをemitするのを模擬
    setTimeout(() => {
      mockSerialPortInstance.emit('data', 'test-data') // onDataを発火
      expect(board.isReady()).toBe(true)
    }, 1) // 非同期処理の完了を待つ
  })

  it('should handle "close" event correctly', () => {
    board.connectManual('/dev/ttyUSB0')
    setTimeout(() => {
      mockSerialPortInstance.emit('close') // onCloseを発火
      setTimeout(() => {
        expect(board.isReady()).toBe(false)
      }, 1)
    }, 1)
  })
})
