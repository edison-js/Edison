import React from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Led } from '../components/output/Led'

const App: React.FC = () => {
  return (
    <Board
      port={'/dev/ttyUSB0'}
      baudRate={115200}
    >
      <Led
        pin={13}
        blink={500}
      />
    </Board>
  )
}
render(<App />)
