import { Servo } from '../Servo';

const main = async () => {
    await Servo(8, 0);
    await Servo(8, 180);
    await Servo(8, 0);
    await Servo(8, 180);
}

main();