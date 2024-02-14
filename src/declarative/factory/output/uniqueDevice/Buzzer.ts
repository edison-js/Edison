import type React from 'react'
import { attachBuzzer } from '../../../../procedure/factory/output/uniqueDevice/buzzer'
import { board } from '../../../../procedure/utils/board'
import type { SerialPort } from 'serialport'
import { useEffect } from 'react'

type BuzzerProps = {
  pin: number
  isOn?: boolean
}

export const Buzzer: React.FC<BuzzerProps> = ({ pin, isOn }) => {
  useEffect(() => {
    const attachDevices = () => {
      board.on('ready', (port: SerialPort) => {
        const buzzer = attachBuzzer(port, pin)
        if (isOn) {
          buzzer.on()
        } else {
          buzzer.off()
        }
      })
    }

    attachDevices()
  }, [isOn, pin])

  return null
}
