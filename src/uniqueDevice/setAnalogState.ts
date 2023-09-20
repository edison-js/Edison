import { SerialPort } from "serialport";
import { setPinAnalog } from "../helper/Analog/setPinAnalog";
import { bufferAnalog } from "../helper/Analog/bufferAnalog";

export const setAnalogState = async (pin: number, port: SerialPort) => {
    const IOMESSAGE = 0xE0;

    const read = async (): Promise<void> => {
        await setPinAnalog(pin, port);
        const bufferValue = 1 << (pin & 0x07);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        await bufferAnalog(port, buffer);
        console.log('read')
        return;
    }
}