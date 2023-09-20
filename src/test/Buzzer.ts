import setup from "../utils/setup"

const main = async () => {
    const port = await setup();
    const buzzer1 = port.buzzer(12);

    await buzzer1.off();
}

main();