import React, { useContext, useEffect } from 'react'
import { attachLed } from '../factory/output/uniqueDevice/led'
import { BoardContext } from './Board'

interface LEDProps {
  pin: number
  isOn: boolean
}

export const LED: React.FC<LEDProps> = ({ pin, isOn }) => {
  const port = useContext(BoardContext)

  useEffect(() => {
    if (!port) return
    const led = attachLed(port, pin)
    if (isOn) {
      led.on()
    } else {
      led.off()
    }
  }, [port, pin, isOn])

  return null
}
