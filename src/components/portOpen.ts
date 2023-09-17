import { SerialPort } from "serialport";

export const portOpen = (path:string) =>{
    const port = new SerialPort({path, baudRate: 57600 });
    return port 
}
