import type React from 'react'
import { board } from '../../../procedure/utils/board'
import { attachOutput } from '../../../procedure/output/uniqueDevice/output'

type BuzzerProps = {
  pin: number
  isOn?: boolean
}

const setupBuzzer = (props: BuzzerProps) => {
  const { pin, isOn } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const buzzer = attachOutput(port, pin)

  if (isOn === true) {
    buzzer.on()
  } else if (isOn === false) {
    buzzer.off()
  }
}

export const Buzzer: React.FC<BuzzerProps> = (props) => {
  if (board.isReady()) {
    setupBuzzer(props)
  } else {
    const handleReady = () => {
      setupBuzzer(props)
    }
    board.on('ready', handleReady)
  }
  return null
}
