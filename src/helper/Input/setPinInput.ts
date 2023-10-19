// import { SerialPort } from 'serialport'

// export const setPinInput = (pin: number, port: SerialPort): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const setPinModeInput = Buffer.from([0xf4, pin, 0])
//     port.write(setPinModeInput, (err) => {
//       if (err) {
//         //console.log('Error on write: ', err.message);
//         reject(err)
//       } else {
//         resolve()
//       }
//     })
//   })
// }
