import type React from 'react'
import { board } from '../../../procedure/utils/board'
import { pwmPort } from '../../../procedure/examples/pwm/pwmPort'

type RGBLEDProps = {
  Rpin: number
  Gpin: number
  Bpin: number
  val: number[]
  isOn?: boolean
  blink?: number
}

const setupRGBLed = (props: RGBLEDProps) => {
  const { Rpin, Gpin, Bpin, val, isOn } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const Rled = pwmPort(port)(Rpin)
  const Gled = pwmPort(port)(Gpin)
  const Bled = pwmPort(port)(Bpin)
  Rled.off()
  Gled.off()
  Bled.off()
  if (isOn === true) {
    Rled.analogWrite(255 - val[0])
    Gled.analogWrite(255 - val[1])
    Bled.analogWrite(255 - val[2])
  } else if (isOn === false) {
    Rled.off()
    Gled.off()
    Bled.off()
  }
}

export const RGBLed: React.FC<RGBLEDProps> = (props) => {
  if (board.isReady()) {
    setupRGBLed(props)
  } else {
    const handleReady = () => {
      setupRGBLed(props)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }
  return null
}
