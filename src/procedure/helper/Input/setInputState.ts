import type { SerialPort } from 'serialport'
import { bufferWrite } from '../Utils/bufferWrite'
import type { Observable } from 'rxjs'
import { fromEventPattern } from 'rxjs'
import { filter, map, scan } from 'rxjs/operators'
import { Buffer } from 'node:buffer'

const SET_PIN_MODE = 0xf4
const INPUT_MODE = 0x00
const DIGITAL_CHANGE_MESSAGE = 0xd0

export const setInputState = (
  pin: number,
  port: SerialPort,
): Observable<boolean> => {
  // ピンモードをデジタル入力に設定
  bufferWrite(port, Buffer.from([SET_PIN_MODE, pin, INPUT_MODE]))
  // デジタルポートの状態変化報告を有効にする（ピンが属するポートの計算が必要）
  bufferWrite(
    port,
    Buffer.from([DIGITAL_CHANGE_MESSAGE + Math.floor(pin / 8), 1]),
  )

  return fromEventPattern<Buffer>(
    (handler) => port.on('data', handler),
    (handler) => port.removeListener('data', handler),
  ).pipe(
    map((data) => (data.length <= 3 ? data : data.subarray(0, 3))),
    scan(
      (
        acc: { preBinary?: Buffer; lastState?: boolean; emit: boolean },
        currentBinary: Buffer,
      ) => {
        const pinIndex = pin % 8
        const isRelevantPin = (currentBinary[0] & 0x0f) === Math.floor(pin / 8) // ピンが属するポートの検証
        const currentState =
          isRelevantPin && ((currentBinary[1] >> pinIndex) & 1) === 1

        // 前回のバイナリデータと同じか、無関係なピンのデータは無視
        if (
          !isRelevantPin ||
          (acc.preBinary && acc.preBinary.equals(currentBinary))
        ) {
          return { ...acc, emit: false }
        }

        // 状態が変わった場合のみ emit を true に設定
        return {
          preBinary: currentBinary,
          lastState: currentState,
          emit: acc.lastState !== currentState,
        }
      },
      { emit: false },
    ),
    filter((acc) => acc.emit),
    map((acc) => acc.lastState as boolean),
  )
}
