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
        pinX="A0"
        pinY="A1"
      >
        {(x, y) => {
          const angleX = Math.floor(Math.acos((x - NEUTRAL_X) / NEUTRAL_X) * 60)
          const angleY = Math.floor(Math.acos((y - NEUTRAL_Y) / NEUTRAL_Y) * 60)
          console.log(angleX, angleY)
          return (
            <>
              <Servo
                pin={8}
                angle={angleX}
              />
              <Servo
                pin={9}
                angle={angleY}
              />
            </>
          )
        }}
      </JoystickSensor>
    </Board>
  )
}

render(<App />)
