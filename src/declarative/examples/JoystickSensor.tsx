import React from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { JoystickSensor } from '../../declarative/components/analog/JoystickSensor'
import { Servo } from '../../declarative/components/servo/Servo'

const App: React.FC = () => {
  const NEUTRAL_X = 524
  const NEUTRAL_Y = 510
  return (
    <Board
      port={'/dev/ttyUSB0'}
      baudRate={57600}
    >
      <JoystickSensor
        pinx="A0"
        piny="A1"
      >
        {(x, y) => {
          console.log(x - NEUTRAL_X, y - NEUTRAL_Y)
          const angle = Math.floor(Math.acos((x - NEUTRAL_X) / NEUTRAL_X) * 60)
          console.log(angle)

          return (
            <Servo
              pin={8}
              angle={angle}
            />
          )
        }}
      </JoystickSensor>
    </Board>
  )
}

render(<App />)
