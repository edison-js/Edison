import setup from "../utils/setup"

const main = async () => {
    const port = await setup();
    const led1 = port.led(0);

    await led1.on();
}

main();