import { SerialPort } from 'serialport'
import { portOpen } from '../../src/utils/portOpen'
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('serialport')

describe('portOpen function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  it('return port when port opens successfully', () => {
    const path = '/dev/mockPath'
    portOpen(path)
    expect(SerialPort).toBeCalledWith({ path: path, baudRate: 57600 })
  })
})
