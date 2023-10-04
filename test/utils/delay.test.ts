import { delay } from '../../src/utils/delay'

describe('_delay function', () => {
  it('should wait for specified milliseconds', async () => {
    const startTime = Date.now()
    const waitTime = 100

    await delay(waitTime)

    const endTime = Date.now()
    const elapsedTime = endTime - startTime

    expect(elapsedTime).toBeGreaterThanOrEqual(waitTime)
    expect(elapsedTime).toBeLessThan(waitTime + 5)
  })
})
