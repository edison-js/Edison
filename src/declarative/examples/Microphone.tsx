import React from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Microphone } from '../components/analog/Microphone'
import { ConsoleLog } from '../components/helper/console'
const RunMicrophone: React.FC = () => {
  return (
    <Board port={'/dev/ttyUSB0'}>
      <Microphone pin={'A0'}>
        <ConsoleLog value={12}></ConsoleLog>
      </Microphone>
    </Board>
  )
}
render(<RunMicrophone />)
