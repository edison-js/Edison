import { SerialPort } from "serialport";
import { setOutputState } from "../../helper/Output/setOutputState";

//factory fuction for led <= 
export const outputPort = (port:SerialPort) => {
  return (pin: number) => {
    return {
      on: async () => {
        await setOutputState(pin, true, port);
      },
      off: async () => {
        await setOutputState(pin, false, port);
      }
    };
  };
}