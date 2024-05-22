import { HallEffective } from '../../declarative/components/input/HallEffectSensor'
import { Led } from '../../declarative/components/output/Led'
import { render } from '../../declarative/rendere/render'
import { Board } from '../../declarative/utils/Board'
import { useState } from 'react'

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false)

  return (
    <Board
      port={'/dev/ttyUSB0'}
      baudRate={115200}
    >
      <HallEffective
        pin={8}
        triggered={() => setIsOn(true)}
        untriggered={() => setIsOn(false)}
      >
        <Led
          pin={13}
          isOn={isOn}
        />
      </HallEffective>
    </Board>
  )
}
render(<App />)
