import setup from '../utils/setup'

const main = async () => {
  const port = await setup()
  const servo1 = port.servo(8)
  const led1 = port.led(12)
  const sensor1 = port.pressureSensor('A0')

  sensor1.read('change', function () {
    led1.on()
  })
  await servo1.rotate(0)
  await servo1.rotate(90)
  await servo1.rotate(180)
  await servo1.rotate(90)
  await servo1.rotate(0)
}

main()
