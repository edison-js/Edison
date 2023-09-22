import setup from "../utils/setup"

const main = async () => {
    const port = await setup();
    const led1 = port.led(12);

    await led1.on();
    await led1.off();
    await led1.on();
    await led1.off();
    await led1.on();
    await led1.off();
    await led1.on();
    await led1.off();
    await led1.on();
    await led1.off();
    await led1.on();
    await led1.off();
}

main();