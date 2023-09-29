import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { findArduinoPath } from '../../src/utils/findArduinoPath'
import { SerialPort } from 'serialport'

vi.mock('serialport')

describe('findArduinoPath', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return the path of the Arduino port if found', async () => {
    const mockPorts = [
      { manufacturer: 'Random', path: '/dev/random1' },
      { manufacturer: 'Arduino LLC', path: '/dev/arduino1' },
    ]
    ;(SerialPort.list as Mock).mockResolvedValue(mockPorts)

    const result = await findArduinoPath()
    expect(result).toBe('/dev/arduino1')
  })

  it('should return null if no Arduino port is found', async () => {
    const mockPorts = [
      { manufacturer: 'Random', path: '/dev/random1' },
      { manufacturer: 'OtherManufacturer', path: '/dev/random2' },
    ]

    ;(SerialPort.list as Mock).mockResolvedValue(mockPorts)

    const result = await findArduinoPath()
    expect(result).toBeNull()
  })

  it('should return null and log an error if an error occurs.', async () => {
    ;(SerialPort.list as Mock).mockRejectedValue(new Error('Some error'))

    const logSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await findArduinoPath()
    expect(result).toBeNull()
    expect(logSpy).toHaveBeenCalledWith(
      'An error occurred while finding the Arduino port. Check your connection with your device:',
      new Error('Some error'),
    )

    logSpy.mockRestore()
  })
})
