import { SerialPort } from "serialport";
import { bufferAnalog } from "../helper/Analog/bufferAnalog";

export const setAnalogState = async (pin: number, port: SerialPort) => {
    const REPORT_ANALOG = 0xC0 //0xE0?
    const ANALOG_MESSAGE = 0xE0

    const read = async (): Promise<void> => {
        const bufferValue = 1 << (pin & 0x07);
        const buffer = Buffer.from([REPORT_ANALOG | pin , 1]);
        await bufferAnalog(port, buffer);

        port.on('data', (data) => {
            const value = data[1] | (data[2] << 7);
            if((data[0] & 0xF0) === ANALOG_MESSAGE) {
                const pin = data[0] & 0x0F;
                if (pin === 0) {
                    const value = data[1] | (data[2] << 7);
                    console.log(`Pressure Sensor: ${value}`)
                }
            }
        return;
        })
   }

    read();
}