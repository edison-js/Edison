import type React from 'react'
import { board } from '../../../procedure/utils/board'
import { pwmPort } from '../../../procedure/examples/pwm/pwmPort'

type VibratorMotorProps = {
  pin: number
  val: number
  isOn?: boolean
}

const setupVibratorMotor = (props: VibratorMotorProps) => {
  const { pin, val, isOn } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const vibratormotor = pwmPort(port)(pin)

  if (isOn === true) {
    vibratormotor.analogWrite(val)
  } else if (isOn === false) {
    vibratormotor.off()
  }
}

export const VibratorMotor: React.FC<VibratorMotorProps> = (props) => {
  if (board.isReady()) {
    setupVibratorMotor(props)
  } else {
    const handleReady = () => {
      setupVibratorMotor(props)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }
  return null
}
