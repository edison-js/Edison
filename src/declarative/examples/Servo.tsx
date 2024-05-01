import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Button } from '../components/input/Button'
import { Led } from '../components/output/Led'
import { Servo } from '../components/servo/Servo'

const App: React.FC = () => {
  const [angle, setAngle] = useState(0)
  const [isOn, setIsOn] = useState(false)

  const handlePress = () => {
    setAngle(angle + 10)
    setIsOn(true)
  }

  const handleRelease = () => {
    if (angle >= 150) {
      setAngle(0)
      setIsOn(false)
      return
    }
    setAngle(angle + 10)
    setIsOn(false)
  }

  return (
    <Board
      port={'/dev/ttyUSB0'}
      baudRate={115200}
    >
      <Button
        pin={8}
        triggered={handlePress}
        untriggered={handleRelease}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
        <Servo
          pin={10}
          angle={angle}
        />
      </Button>
    </Board>
  )
}
render(<App />)
