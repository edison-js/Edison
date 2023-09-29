import { delay } from '../../src/utils/delay'
import { describe, expect, it, vitest } from 'vitest'

vitest.useFakeTimers()

describe('delay function', () => {
  it('should delay for specified time', async () => {
    const mockFn = vitest.fn()

    delay(1000).then(mockFn)

    vitest.advanceTimersByTime(999)
    await Promise.resolve()
    expect(mockFn).not.toHaveBeenCalled()

    vitest.advanceTimersByTime(1)
    await Promise.resolve()
    expect(mockFn).toHaveBeenCalled()
  })
})
