import { useEffect } from 'react'
import { attachServo } from '../../../procedure/examples/servo/uniqueDevice/servo'
import { board } from '../../../procedure/utils/board'
import type React from 'react'

type ServoProps = {
  pin: number
  angle: number
}

// const setupServo = (props: ServoProps) => {
//   const { pin, angle } = props
//   const port = board.getCurrentPort()

//   if (!port) {
//     console.error('Board is not connected.')
//     return
//   }
//   console.log('attach', angle)
//   const servo = attachServo(port, pin)
//   servo.setAngle(angle)
// }

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
