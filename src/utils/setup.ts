import { SerialPort } from "serialport";
import { findArduinoPath } from "./findArduinoPath";
import {  outputPort } from "../factory/output/outputPort";
import { servoPort } from "../factory/servo/servoPort";
import { analogPort } from "../factory/analog/analogPort";

const setup = async () => {
    console.log(1)

const START_SYSEX = 0xF0;
const END_SYSEX = 0xF7;
const SET_PIN_MODE = 0xF4;
const REPORT_ANALOG = 0xC0; // Enable analog reporting for pin
const ANALOG_MESSAGE = 0xE0; // Analog message command

    const path = await findArduinoPath()
    
    const port = new SerialPort({ path, baudRate: 57600 });
    
    let onDataReady: (() => void) | null = null;
    const dataReady = new Promise<void>(resolve => {
        console.log(3)
      onDataReady = resolve;
    });

    port.on('data', (data) => {
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
