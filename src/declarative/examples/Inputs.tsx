import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Button } from '../components/input/Button'
import { Led } from '../components/output/Led'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)
  const [isOn1, setIsOn1] = useState(false)

  return (
    <Board port={'/dev/ttyUSB0'}>
      <Button
        pin={8}
        onPress={() => setIsOn(true)}
        onRelease={() => setIsOn(false)}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
      </Button>
      <Button
        pin={12}
        onPress={() => setIsOn1(true)}
        onRelease={() => setIsOn1(false)}
      >
        <Led
          pin={4}
          isOn={isOn1}
        />
      </Button>
    </Board>
  )
}
render(<App />)
