import React, { useContext } from 'react'
import { attachLed } from '../factory/output/uniqueDevice/led'
import { BoardContext } from './Board'

interface LEDProps {
  pin: number
  isOn: boolean
}

export const LED: React.FC<LEDProps> = ({ pin, isOn }) => {
  const port = useContext(BoardContext)
  if (port) {
    const led = attachLed(port, pin)
  }

  return null
}
