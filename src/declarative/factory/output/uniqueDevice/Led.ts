import type React from 'react'
import { attachLed } from '../../../../procedure/factory/output/uniqueDevice/led'
import { board } from '../../../../procedure/utils/board'
import type { SerialPort } from 'serialport'

type LEDProps = {
  pin: number
  isOn?: boolean
  blink?: number
}

export const Led: React.FC<LEDProps> = ({ pin, isOn, blink }) => {
  board.on('ready', (port: SerialPort) => {
    const led = attachLed(port, pin)

    if (isOn === true) {
      led.on()
    }

    if (isOn === false) {
      led.off()
    }

    if (blink) {
      led.blink(blink)
    }
  })

  return null
}
