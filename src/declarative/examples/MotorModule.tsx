import React, { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Button } from '../components/input/Button'
import { VibratorMotor } from '../components/output/VibratorMotor'

const App: React.FC = () => {
  const [value, setValue] = useState(0)
  const handlePress = () => {
    if (value < 255) {
      setValue(value + 5)
    } else {
      setValue(0)
    }
    console.log(value)
  }

  const handleRelease = () => {}

  return (
    <Board port={'/dev/ttyUSB0'}>
      <Button
        pin={9}
        onPress={handlePress}
        onRelease={handleRelease}
      >
        <VibratorMotor
          pin={10}
          val={value}
          isOn={true}
        />
      </Button>
    </Board>
  )
}
render(<App />)
