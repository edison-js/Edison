import setup from '../utils/setup'

const main = async () => {
  const port = await setup()
  const servo1 = port.servo(8)

  await servo1.rotate(0)
  await servo1.rotate(90)
  await servo1.rotate(180)
  await servo1.rotate(90)
  await servo1.rotate(0)
}

main()
