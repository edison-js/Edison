import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../components/output/Led'
import { PhotoInterrupter } from '../components/input/PhotoInterrupter'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)

  const handlePress = () => {
    setIsOn(true)
  }

  const handleRelease = () => {
    setIsOn(false)
  }

  return (
    <Board port={'/dev/ttyUSB0'}>
      <PhotoInterrupter
        pin={9}
        onPress={handlePress}
        onRelease={handleRelease}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
      </PhotoInterrupter>
    </Board>
  )
}
render(<App />)
