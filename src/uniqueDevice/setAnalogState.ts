import { SerialPort } from "serialport";
import { bufferAnalog } from "../helper/Analog/bufferAnalog";
import { Observable } from "rxjs";

export const setAnalogState = (pin: number, port: SerialPort) => {
    const REPORT_ANALOG = 0xC0;
    const ANALOG_MESSAGE = 0xE0;
    const CONSECUTIVE_ZEROES = 7;  // 連続ゼロのカウント数

    let zeroCount = 0;  // 連続ゼロのカウントを保持する変数

    return new Observable<boolean>(observer => {
        const buffer = Buffer.from([REPORT_ANALOG | pin, 1]);
        bufferAnalog(port, buffer);

        
        const onData = (data: Buffer) => {
            if ((data[0] & 0xF0) === ANALOG_MESSAGE) {
                const pin = data[0] & 0x0F;
                if (pin === 0) {
                    const value = data[1] | (data[2] << 7);
                    // 0の値が連続しているか確認
                    if (value < 10) {
                        zeroCount++;
                        if (zeroCount >= CONSECUTIVE_ZEROES) {
                            observer.next(true);
                            zeroCount = 0;  // カウントをリセット
                        }
                    } else {
                        zeroCount = 0;  // ゼロでない場合、カウントをリセット
                    }
                }
            }
        };
        port.on("data", onData);

        return () => {
            port.off("data", onData);
        };
    });
}