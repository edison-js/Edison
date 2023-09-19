import { SerialPort } from "serialport"
import { setPinOutput } from "../../utils/setPinOutput";
import { bufferOutput } from "../../utils/bufferOutput";

export const setLedState = async ( pin: number, onoff: boolean, port:SerialPort) => {
      const IOMESSAGE = 0x90;

      const on =  async ():Promise<void> => {
        console.log('on')
        await setPinOutput(pin, port);
        const bufferValue = 1 << (pin & 0x07);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        setTimeout(async () => {
          await bufferOutput(port, buffer);
        }, 3000);

        return;
      };
  
      const off = async ():Promise<void> => {
        setPinOutput(pin, port);
        const bufferValue = 1 << (0x00);
        const buffer = Buffer.from([IOMESSAGE + (pin >> 3), bufferValue, 0x00]);
        await bufferOutput(port, buffer);
        return;
      };

      if (onoff) {
                on();
            } else {
                off();
            }       
    }
