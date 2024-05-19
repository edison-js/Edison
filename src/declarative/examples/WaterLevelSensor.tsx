import React from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { WaterLevelSensor } from '../../declarative/components/analog/WaterLevelSensor'
import { Led } from '../../declarative/components/output/Led'

const App: React.FC = () => {
  return (
    <Board
      port="/dev/cu.usbserial-1140"
      baudRate={57600}
    >
      <WaterLevelSensor pin="A0">
        {(value) =>
          value < 400 ? (
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
        }
      </WaterLevelSensor>
    </Board>
  )
}

render(<App />)
