import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../components/output/Led'
import { PIRMotionSensor } from '../components/input/PIRMotionSensor'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)

  return (
    <Board port={'/dev/ttyUSB0'}>
      <PIRMotionSensor
        pin={8}
        triggered={() => {
          setIsOn(true)
        }}
        untriggered={() => {
          setIsOn(false)
        }}
        delaytime={5000}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
      </PIRMotionSensor>
    </Board>
  )
}
render(<App />)
