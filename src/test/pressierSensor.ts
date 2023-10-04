import { setup } from '../utils/setup'
const main = async () => {
  const port = await setup()

  const sensor1 = port.pressureSensor('A0')
  //await sensor1.read()
}

main()
