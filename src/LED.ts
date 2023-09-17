import { SerialPort } from "serialport"
import { findArduinoPath } from "./components/findArduinoPath";
import { setPinOutput } from "./components/setPinOutput";
import { bufferOutput } from "./components/bufferOutput";
import { portClose } from "./components/portClose";

export const LED = async (pin: number, onoff: boolean) => {

      const path = await findArduinoPath();
      const port = new SerialPort({ path, baudRate: 57600 });
      const IOMESSAGE = 0x90;

      const on =  async ():Promise<void> => {
        await setPinOutput(pin, port);
        const bufferValue = 1 << (pin & 0x07);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        await bufferOutput(port, buffer);
        portClose(port);
        return;
      };
  
      const off = ():Promise<void> => {
        setPinOutput(pin, port);
        const bufferValue = 1 << (0x00);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        bufferOutput(port, buffer);
        portClose(port);
        return;
      };

      port.on('data',   (data) => {
        console.log('Data from Arduino:', data);
        // If the last 2 bytes are <Buffer 00 f7>, we can light the LED

        const lastTwoBytes = data.slice(-2);
        if (lastTwoBytes.equals(Buffer.from([0x00, 0xf7]))) {
            if (onoff) {
                on();
            } else {
                off();
            }       
        }
      });
    }
