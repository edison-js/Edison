import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../components/output/Led'
import { DigitalTilt } from '../../declarative/components/input/DigitalTiltSensor'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)

  return (
    <Board port={'/dev/ttyUSB0'}>
      <DigitalTilt
        pin={8}
        triggered={() => {
          setIsOn(true)
        }}
        untriggered={() => {
          setIsOn(false)
        }}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
      </DigitalTilt>
    </Board>
  )
}
render(<App />)
