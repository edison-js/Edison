import { SerialPort } from "serialport";

// This function closes the serial port. Console will be closed.
export const portClose = (port: SerialPort): Promise<void> => {
  return new Promise((resolve, reject) => {
    port.close(err => {
      if (err) {
        console.log('Error closing port:', err);
        reject(err); 
      } else {
        resolve();
      }
    });
  });
}
