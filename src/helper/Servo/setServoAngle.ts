import { SerialPort } from "serialport";

// Set servo angle on Arduino
export const  setServoAngle = (pin:number, angle: number, port:SerialPort):Promise<void> => {
    const PIN = pin;
    const data = [
      0xE0 | PIN, // Start analog message for pin
      angle & 0x7F, // Send 7 bits only
      (angle >> 7) & 0x7F // bitwise shift and take next 7 bits
    ];
    port.write(Buffer.from(data));
    console.log('setservoangle,',data)
    return;
  }