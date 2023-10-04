import { delay } from '../utils/delay'
import { setup } from '../utils/setup'

const main = async () => {
  const port = await setup()
  const led1 = port.led(12)

  for (let i = 0; i < 3; i++) {
    await led1.on()
    await delay(1000)
    await led1.off()
    await delay(1000)
  }
}
main()
