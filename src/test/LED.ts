import setup from "../utils/setupTests";

const main = async () => {
    const port = await setup();  
    const led1 = port.led(12);
    console.log('Start')
    await led1.on();
}

main();
