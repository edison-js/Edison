// App.tsx

import React, { useState } from 'react'
import { Board } from './Board'
import { LED } from './LedComponent'

const App: React.FC = () => {
  const [isLedOn, setLedOn] = useState(false)
  const toggleLED = () => setLedOn(!isLedOn)

  console.log(3)

  return (
    <Board onReady={(port) => console.log('Board is ready!')}>
      <LED
        pin={13}
        isOn={isLedOn}
      />
      <button onClick={toggleLED}>Toggle LED</button>
    </Board>
  )
}

export default App

/*
import React, { useState } from 'react'
import { Board } from './Board'
import { LED } from './LedComponent'

const main = () => {
  const [isLedOn, setLedOn] = useState(false)
  const toggleLED = () => setLedOn(!isLedOn)
  console.log(3)

  return (
    <Board onReady={(port) => console.log('Board is ready!')}>
      <LED
        pin={13}
        isOn={isLedOn}
      />
      <button onClick={toggleLED}>Toggle LED</button>
    </Board>
  )
}

export default main


*/
