import { Servo } from '../Servo';
import { findArduinoPath } from '../components/findArduinoPath';
import { delay } from '../components/delay';

const main = async () => {
    const path = await findArduinoPath();
    await Servo(path, 8, 0);
    await delay(100);
    await Servo(path, 8, 90);
}

main();