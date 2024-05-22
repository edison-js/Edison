import React from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../../declarative/components/output/Led'
import { AnalogTemperature } from '../../declarative/components/analog/AnalogTemperature'

const App: React.FC = () => {
  return (
    <Board
      port="/dev/cu.usbserial-1140"
      baudRate={57600}
    >
      <AnalogTemperature pin="A0">
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
      </AnalogTemperature>
    </Board>
  )
}

render(<App />)
