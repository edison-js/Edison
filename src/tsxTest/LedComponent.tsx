// LedComponent.tsx

import React, { useContext, useEffect } from 'react'
import { BoardContext } from './Board'
import { attachLed } from '../factory/output/uniqueDevice/led'

interface LEDProps {
  pin: number
  isOn: boolean
}

export const LED: React.FC<LEDProps> = ({ pin, isOn }) => {
  const port = useContext(BoardContext)
  console.log('port is', port)
  if (port) {
    const led = attachLed(port, pin)
    if (isOn) {
      led.on()
    }
    if (isOn !== false) {
      led.off()
    }
  }

  return null // このコンポーネントはUIを持たないため、nullを返します。
}
