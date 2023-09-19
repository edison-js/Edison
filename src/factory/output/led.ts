import { SerialPort } from "serialport";
import { setLedState } from "../../helper/Led/LED";

//factory fuction for led <= 
export const outputPort = (port:SerialPort) => {
  return (pin: number) => {
    return {
      on: async () => {
        await setLedState(pin, true, port);
      },
      off: async () => {
        await setLedState(pin, false, port);
      }
    };
  };
}