// App.tsx

import React, { useState, useEffect } from 'react'
import { Board } from './Board'
import { LED } from './LedComponent'

const App: React.FC = () => {
  const [isLedOn, setLedOn] = useState(true)
  console.log(1)

  useEffect(() => {
    console.log(5)
    // 1秒後にLEDの状態をオンにする
    const timer = setTimeout(() => setLedOn(true), 1000)

    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => clearTimeout(timer)
  }, [])

  return (
    <Board onReady={() => console.log('Board is ready!', isLedOn)}>
      <LED
        pin={13}
        isOn={isLedOn}
      />
    </Board>
  )
}

export default App
