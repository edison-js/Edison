import { SerialPort } from 'serialport'
import { setPinOutput } from '../../../src/helper/Output/setPinOutput'

jest.mock('serialport')

test('setPinOutput resolves on successful write', async () => {
  const mockWrite = jest
    .fn()
    .mockImplementation((_data, callback) => callback(null))

  const mockSerialPortInstance = {
    write: mockWrite,
  } as unknown as jest.Mocked<SerialPort>
  await expect(setPinOutput(10, mockSerialPortInstance)).resolves.not.toThrow()
  expect(mockWrite).toHaveBeenCalledWith(
    Buffer.from([0xf4, 10, 1]), // Set pin 10 to output mode
    expect.any(Function),
  )
})

test('setPinOutput rejects on write error', async () => {
  const mockError = new Error('Mock write error')
  const mockWrite = jest
    .fn()
    .mockImplementation((_data, callback) => callback(mockError))

  const mockSerialPortInstance = {
    write: mockWrite,
  } as unknown as jest.Mocked<SerialPort>
  await expect(setPinOutput(10, mockSerialPortInstance)).rejects.toEqual(
    mockError,
  )
  expect(mockWrite).toHaveBeenCalledWith(
    Buffer.from([0xf4, 10, 1]),
    expect.any(Function),
  )
})
