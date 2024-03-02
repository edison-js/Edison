import type React from 'react'
import { board } from '../../../procedure/utils/board'
import { pwmPort } from '../../../procedure/examples/pwm/pwmPort'

type MotorModuleProps = {
  pin: number
  val: number
  isOn?: boolean
}

const setupMotorModule = (props: MotorModuleProps) => {
  const { pin, val, isOn } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const motormodule = pwmPort(port)(pin)

  if (isOn === true) {
    motormodule.analogWrite(val)
  } else if (isOn === false) {
    motormodule.off()
  }
}

export const MotorModule: React.FC<MotorModuleProps> = (props) => {
  if (board.isReady()) {
    setupMotorModule(props)
  } else {
    const handleReady = () => {
      setupMotorModule(props)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }
  return null
}
