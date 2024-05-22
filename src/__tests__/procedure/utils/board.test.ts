import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { SerialPort } from 'serialport'
import type { Ora } from 'ora'
import ora from 'ora'
import { board } from '../../../procedure/utils/board'

vi.mock('serialport')
vi.mock('ora')
const ARDUINO_PATH = '/dev/ttyUSB0'
const BAUD_RATE = 57600

describe('board', () => {
  let mockPort: SerialPort
  let mockSpinner: Ora

  beforeEach(() => {
    mockPort = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 57600 })
    vi.mocked(SerialPort).mockImplementation(() => mockPort)

    mockSpinner = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
      fail: vi.fn().mockReturnThis(),
    } as unknown as Ora
    vi.mocked(ora).mockReturnValue(mockSpinner)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('connectManual', () => {
    it('should handle port close event', async () => {
      vi.spyOn(process, 'exit').mockImplementation(vi.fn())

      board.connectManual(ARDUINO_PATH, BAUD_RATE)

      mockPort.on('close', () => {
        expect(mockSpinner.fail).toHaveBeenCalledWith('Board is closed.')
        expect(board.getCurrentPort()).toBeNull()
        expect(board.isReady()).toBe(false)
        expect(process.exit).toHaveBeenCalledWith(1)
      })

      mockPort.emit('data', '*data*')
      await new Promise((resolve) => setTimeout(resolve, 0))

      mockPort.emit('close')
    })
  })

  describe('on', () => {
    it('should return the port status', async () => {
      const listener = vi.fn()
      board.on('ready', listener)

      board.connectManual(ARDUINO_PATH, BAUD_RATE)

      mockPort.on('data', () => {
        expect(board.isReady()).toBe(true)
        expect(mockSpinner.succeed).toHaveBeenCalledWith(
          'Device is connected successfully!',
        )
      })

      mockPort.emit('data', '*data*')
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  })

  describe('off', () => {
    it('should remove event listeners', async () => {
      const listener = vi.fn()
      board.on('ready', listener)
      board.off('ready', listener)

      board.connectManual(ARDUINO_PATH, BAUD_RATE)
      mockPort.emit('data', '*data*')
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('isReady', () => {
    it('should return the port status', async () => {
      vi.spyOn(process, 'exit').mockImplementation(vi.fn())

      expect(board.isReady()).toBe(false)

      board.connectManual(ARDUINO_PATH, BAUD_RATE)

      mockPort.on('data', () => {
        expect(board.isReady()).toBe(true)
        expect(mockSpinner.succeed).toHaveBeenCalledWith(
          'Device is connected successfully!',
        )
      })

      mockPort.emit('data', '*data*')
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  })
})
