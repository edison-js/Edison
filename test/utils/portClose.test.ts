import { describe, expect, it, vi } from 'vitest'
import { portClose } from '../../src/utils/portClose'
describe('portClose function', () => {
  it('should resolve without error when port closes successfully', async () => {
    const mockPort: any = {
      close: vi.fn((callback) => callback(null)),
    }

    await expect(portClose(mockPort)).resolves.not.toThrow()
    expect(mockPort.close).toBeCalled()
  })

  it('should reject with error when port fails to close', async () => {
    const mockError = new Error('Port closing error')
    const mockPort: any = {
      close: vi.fn((callback) => callback(mockError)),
    }

    await expect(portClose(mockPort)).rejects.toThrow(mockError)
    expect(mockPort.close).toBeCalled()
  })
})
