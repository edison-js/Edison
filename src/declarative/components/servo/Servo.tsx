import { attachServo } from '../../../procedure/servo/uniqueDevice/servo'
import { board } from '../../../procedure/utils/board'
import type React from 'react'

type ServoProps = {
  pin: number
  angle: number
}

export const Servo: React.FC<ServoProps> = ({ pin, angle }) => {
  const port = board.getCurrentPort()
  if (!port) {
    console.error('Board is not connected.')
    return null
  }

  const servo = attachServo(port, pin)

  if (board.isReady()) {
    servo.setAngle(angle)
  }
  return null
}
