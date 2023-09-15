import {SerialPort} from 'serialport';

export const findArduinoPath = async (): Promise<string | null> =>  {
    try {
        const ports = await SerialPort.list();
        for (const port of ports) {
            if (port.manufacturer && port.manufacturer.includes('Arduino')) {
                return port.path;
            }
        }
        return null;
    } catch (error) {
        console.error('An error occurred while finding the Arduino port:', error);
        return null;
    }
}

