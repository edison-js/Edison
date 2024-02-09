import React from 'react'
import { Board } from './utils/Board'
import { Led } from './factory/output/uniqueDevice/Led'
import { renderToString } from 'react-dom/server'

const App: React.FC = () => {
  return (
    <Board port={'/dev/ttyUSB0'}>
      <Led pin={13} />
    </Board>
  )
}

renderToString(<App />)
export { App }
