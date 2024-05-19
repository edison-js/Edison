import type React from 'react'
import { board } from '../../../procedure/utils/board'
import { pwmPort } from '../../../procedure/pwm/pwmPort'

type VibrationMotorModuleProps = {
  pin: number
  val: number
  isOn?: boolean
}

const setupVibrationMotorModule = (props: VibrationMotorModuleProps) => {
  const { pin, val, isOn } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const vibrationmotormodule = pwmPort(port)(pin)

  if (isOn === true) {
    vibrationmotormodule.analogWrite(val)
  } else if (isOn === false) {
    vibrationmotormodule.off()
  }
}

export const VibrationMotorModule: React.FC<VibrationMotorModuleProps> = (
  props,
) => {
  if (board.isReady()) {
    setupVibrationMotorModule(props)
  } else {
    const handleReady = () => {
      setupVibrationMotorModule(props)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }
  return null
}
