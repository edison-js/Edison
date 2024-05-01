import React from 'react'
import { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../components/output/Led'
import { PhotoInterrupter } from '../components/input/PhotoInterrupter'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)

  return (
    <Board
      port={'/dev/ttyUSB0'}
      baudRate={115200}
    >
      <PhotoInterrupter
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
      </PhotoInterrupter>
    </Board>
  )
}
render(<App />)
