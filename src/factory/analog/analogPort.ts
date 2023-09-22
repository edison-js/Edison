import { SerialPort } from "serialport";
import { setAnalogState } from "../../uniqueDevice/setAnalogState";
import { AnalogPin, analogPinMapping } from "../../types/analog/analog";
import { Subscription } from "rxjs";

export const analogPort = (port: SerialPort) => {
    return (analogPin: AnalogPin) => {
        const pin = analogPinMapping[analogPin];
        let subscription:Subscription;

        return {
            read: async (func:Promise<void> | void | (() => any)):Promise<void> => {
                const observable = setAnalogState(pin, port);
                subscription = observable.subscribe(value => {
                    if (value) {
                        // 圧力がかかった場合の処理をこちらに書きます
                        console.log(value);
                        func
                    } else {
                        // 圧力がかからなかった場合の処理をこちらに書きます
                        console.log(value);
                    }
                });
            },
            stop: () => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        }
    }
}