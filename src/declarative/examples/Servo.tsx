import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Button } from '../components/input/Button'
import { Servo } from '../components/servo/Servo'

const App: React.FC = () => {
  const [angle, setAngle] = useState(0)

  const handlePress = () => {
    if (angle >= 150) {
      setAngle(0)
    }
  }

  const handleRelease = () => {
    setAngle((prevAngle) => {
      const newAngle = prevAngle + 10

      return newAngle
    })
  }

  return (
    <Board
      port={'/dev/cu.usbserial-140'}
      baudRate={57600}
    >
      <Button
        pin={8}
        triggered={handlePress}
        untriggered={handleRelease}
      >
        <Servo
          pin={10}
          angle={angle}
        />
        <Servo
          pin={12}
          angle={angle}
        />
      </Button>
    </Board>
  )
}
render(<App />)
