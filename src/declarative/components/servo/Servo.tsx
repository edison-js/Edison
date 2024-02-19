import { useEffect } from 'react'
import { attachServo } from '../../../procedure/examples/servo/uniqueDevice/servo'
import { board } from '../../../procedure/utils/board'
import type React from 'react'

type ServoProps = {
  pin: number
  angle: number
}

export const Servo: React.FC<ServoProps> = ({ pin, angle }) => {
  useEffect(() => {
    if (board.isReady()) {
      const port = board.getCurrentPort()
      if (port) {
        const servo = attachServo(port, pin)
        servo.setAngle(angle)
      }
    }
  }, [angle, pin])

  return null
}
