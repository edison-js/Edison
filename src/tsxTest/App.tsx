// App.tsx
import React, { useState, useEffect } from 'react'
import { Board } from './Board'
import { LED } from './LedComponent'

const App: React.FC = () => {
  const [isLedOn, setLedOn] = useState(false)

  // ここでセンサーや他の入力を監視して、isLedOnの状態を更新することができます
  useEffect(() => {
    // センサーの読み取りやボタンのクリックを監視して、setLedOnを呼び出してLEDの状態を更新します
  }, [])

  return (
    <Board onReady={(port) => console.log('Board is ready!')}>
      <LED
        pin={13}
        isOn={isLedOn}
      />
    </Board>
  )
}

export default App
