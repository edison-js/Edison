// // board.test.ts
// import { describe, it, expect, vi } from 'vitest'
// import type { SerialPort } from 'serialport'
// import { board } from '../../utils/board'
// import { findArduinoPath } from '../../utils/findArduinoPath'

// // SerialPort と findArduinoPath のモック
// vi.mock('serialport', () => ({
//   SerialPort: vi.fn().mockImplementation(() => ({
//     on: vi.fn((event, callback) => {
//       if (event === 'data') {
//         // 'data' イベントのモック処理
//         setTimeout(() => callback('some data'), 0)
//       }
//     }),
//     // 他の必要なメソッドもモック化
//   })),
// }))

// vi.mock('../../utils/findArduinoPath', () => ({
//   findArduinoPath: vi.fn().mockResolvedValue('/dev/ttyUSB0'),
// }))

// describe('board module', () => {
//   it('should emit "ready" when Arduino is connected', async () => {
//     ;(findArduinoPath as vi.Mock).mockResolvedValue('/dev/ttyUSB0')
//     const mockSerialPortInstance = new SerialPort({
//       path: '/dev/ttyUSB0',
//       baudRate: 57600,
//     })
//     const readyListener = vi.fn()
//     board.on('ready', readyListener)
//     await board.connectAutomatic()
//     expect(readyListener).toHaveBeenCalled()
//   })
// })
