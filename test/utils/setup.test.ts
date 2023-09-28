import { vitest, describe, beforeEach, it, expect } from 'vitest'
import setup from '../../src/utils/setup'
import { SerialPort } from 'serialport'

vitest.mock('serialport')

describe('setup', () => {
  beforeEach(() => {
    vitest.resetAllMocks()
  })
  it('should be defined', () => {
    expect(setup).toBeDefined()
  })
})
