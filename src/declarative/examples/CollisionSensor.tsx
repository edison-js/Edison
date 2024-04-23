import React, { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Collision } from '../components/input/Collision'
import { Led } from '../components/output/Led'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)

  return (
    <Board port={'/dev/ttyUSB0'}>
      <Collision
        pin={8}
        triggered={() => setIsOn(true)}
        untriggered={() => setIsOn(false)}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
      </Collision>
    </Board>
  )
}
render(<App />)
