import React from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../../declarative/components/output/Led'
import { AnalogRotation } from '../../declarative/components/analog/AnalogRotation'

const App: React.FC = () => {
  return (
    <Board
      port="/dev/cu.usbserial-1140"
      baudRate={57600}
    >
      <AnalogRotation pin="A0">
        {(value) => {
          console.log(value)
          return value < 400 ? (
            <Led
              pin={13}
              isOn={false}
            />
          ) : (
            <Led
              pin={13}
              isOn={true}
            />
          )
        }}
      </AnalogRotation>
    </Board>
  )
}

render(<App />)
