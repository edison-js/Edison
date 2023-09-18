import { setup } from "../utils/setup";

const servo1 = setup('/dev/ttyACM0', 8, 'Servo');

const main = async () => {
    await servo1.lotate(0); // Works, type-safe
    await servo1.lotate(90); 
}

main();