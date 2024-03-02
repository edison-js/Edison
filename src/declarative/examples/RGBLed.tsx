import React, { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { RGBLed } from '../components/output/RGBLed'
import { Button } from '../components/input/Button'

const App: React.FC = () => {
  const [value, setValue] = useState([0, 0, 0])
  const handlePress = () => {
    if (value[0] < 50) {
      setValue([value[0] + 5, 0, 0])
    } else if (value[1] < 50) {
      setValue([value[0], value[1] + 5, 0])
    } else if (value[2] < 50) {
      setValue([value[0], value[1], value[2] + 5])
    } else {
      setValue([0, 0, 0])
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
        <RGBLed
          Rpin={11}
          Gpin={10}
          Bpin={9}
          val={value}
          isOn={true}
        />
      </Button>
    </Board>
  )
}
render(<App />)
