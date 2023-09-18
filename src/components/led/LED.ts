import { SerialPort } from "serialport"
import { findArduinoPath } from "../../utils/findArduinoPath";
import { setPinOutput } from "../../utils/setPinOutput";
import { bufferOutput } from "../../utils/bufferOutput";
import { portClose } from "../../utils/portClose";

export const setLedState = async ( pin: number, onoff: boolean, port:SerialPort) => {
      const IOMESSAGE = 0x90;

      const on =  async ():Promise<void> => {
        await setPinOutput(pin, port);
        const bufferValue = 1 << (pin & 0x07);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        setTimeout(async () => {
          await bufferOutput(port, buffer);
          await portClose(port);          
        }, 3000);

        return;
      };
  
      const off = async ():Promise<void> => {
        setPinOutput(pin, port);
        const bufferValue = 1 << (0x00);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        await bufferOutput(port, buffer);
        await portClose(port);
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
