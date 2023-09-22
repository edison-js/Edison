import { SerialPort } from "serialport";
import { setAnalogState } from "../../uniqueDevice/setAnalogState";

export const analogPort = (port: SerialPort) => {
    return (pin: number) => {
        return {
            read: async () => {
                await setAnalogState(pin, port);
            }
        }
    }
}