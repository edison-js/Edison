import type React from 'react'
import { attachBuzzer } from '../../../../procedure/factory/output/uniqueDevice/buzzer'
import { board } from '../../../../procedure/utils/board'
import type { SerialPort } from 'serialport'

type LEDProps = {
  pin: number
  isOn?: boolean
  blink?: number
}

export const Buzzer: React.FC<LEDProps> = ({ pin, isOn }) => {
  board.on('ready', (port: SerialPort) => {
    const buzzer = attachBuzzer(port, pin)

    if (isOn === true) {
      buzzer.on()
    }

    if (isOn === false) {
      buzzer.off()
    }
  })

  return null
}
