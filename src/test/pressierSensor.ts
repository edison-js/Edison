import setup from "../utils/setup"


const main = async () => { 
    const port = await setup()

    const sensor1 = port.pressureSensor(12)
    await sensor1.read()
}

main()