import setup from "../utils/setup";

const main = async () => {
    const port = await setup();  
    const servo1 = port.servo(8);
    const led1 = port.led(12);
    const sensor1 = port.pressureSensor("A0")
    const ledOn = led1.on
    const ledOff = led1.off

    await sensor1.read(ledOn)
    await servo1.rotate(0);
    await servo1.rotate(90);
    await servo1.rotate(180);
    await servo1.rotate(90);
    await servo1.rotate(0);

}

main();