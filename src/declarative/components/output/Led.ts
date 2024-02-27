import type React from 'react'
import { attachLed } from '../../../procedure/examples/output/uniqueDevice/led'
import { board } from '../../../procedure/utils/board'

type LEDProps = {
  pin: number
  isOn?: boolean
  blink?: number
}

const setupLed = (props: LEDProps) => {
  const { pin, isOn, blink } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const led = attachLed(port, pin)

  if (isOn === true) {
    led.on()
  } else if (isOn === false) {
    led.off()
  }

  if (blink) {
    led.blink(blink)
  }
}

export const Led: React.FC<LEDProps> = (props) => {
  if (board.isReady()) {
    setupLed(props)
  } else {
    const handleReady = () => {
      setupLed(props)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }
  return null
}
