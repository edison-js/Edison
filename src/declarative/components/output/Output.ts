import type React from 'react'
import { board } from '../../../procedure/utils/board'
import { attachOutput } from '../../../procedure/examples/output/uniqueDevice/output'

type OutputProps = {
  pin: number
  isOn?: boolean
}

const setupOutput = (props: OutputProps) => {
  const { pin, isOn } = props
  const port = board.getCurrentPort()

  if (!port) {
    console.error('Board is not connected.')
    return
  }

  const output = attachOutput(port, pin)

  if (isOn === true) {
    output.on()
  } else if (isOn === false) {
    output.off()
  }
}

export const Output: React.FC<OutputProps> = (props) => {
  if (board.isReady()) {
    setupOutput(props)
  } else {
    const handleReady = () => {
      setupOutput(props)
      board.off('ready', handleReady)
    }
    board.on('ready', handleReady)
  }
  return null
}
