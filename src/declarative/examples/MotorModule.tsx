import React, { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Button } from '../components/input/Button'
import { MotorModule } from '../components/output/MotorModule'

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
        pin={12}
        onPress={handlePress}
        onRelease={handleRelease}
      >
        <MotorModule
          pin={9}
          val={value}
          isOn={false}
        />
      </Button>
    </Board>
  )
}
render(<App />)
