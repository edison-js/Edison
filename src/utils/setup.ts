import { SerialPort } from "serialport";
import { findArduinoPath } from "./findArduinoPath";
import {  outputPort } from "../factory/output/digital";
import { servoPort } from "../factory/servo/servo";
import { analogPort } from "../factory/analog/analogPort";

const setup = async () => {
    console.log(1)
    const path = await findArduinoPath()
    
    const port = new SerialPort({ path, baudRate: 57600 });
    
    let onDataReady: (() => void) | null = null;
    const dataReady = new Promise<void>(resolve => {
        console.log(3)
      onDataReady = resolve;
    });

    port.on('data', (data) => {
        console.log('Data:', data)
        if (onDataReady) {
           onDataReady();
         }
        })
        await dataReady
    console.log(2)
  return {
    servo: servoPort(port),
    led: outputPort(port),
    buzzer: outputPort(port),
    pressureSensor:analogPort(port) ,
  };
}

export default setup;
