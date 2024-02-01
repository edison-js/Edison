// App.tsx
import React, { useState, useEffect } from 'react'
import { Board } from './Board'
import { LED } from './LedComponent'

const App: React.FC = () => {
  const [isLedOn, setLedOn] = useState(false)

  useEffect(() => {
    // Monitor sensor readings and button clicks and call setLedOn to update LED state
  }, [])

  return (
    <Board>
      <LED
        pin={13}
        isOn={isLedOn}
      />
    </Board>
  )
}

export default App
