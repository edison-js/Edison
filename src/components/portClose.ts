import { SerialPort } from "serialport";

export const portClose =  (port: SerialPort) =>{
    port.close(err => {
        if (err) {
          console.log('Error closing port:', err);
        } else {
        }
      });
}
