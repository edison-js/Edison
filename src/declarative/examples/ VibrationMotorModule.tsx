import React, { useState } from 'react'
import { Board } from '../utils/Board'
import { render } from '../rendere/render'
import { Button } from '../components/input/Button'
import { VibrationMotorModule } from '../components/pwm/VibrationMotorModule'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <Board
      port={'/dev/ttyUSB0'}
      baudRate={115200}
    >
      <Button
        pin={8}
        triggered={() => {
          if (value < 255) {
            setValue(value + 5)
          } else if (value >= 255) {
            setValue(0)
          }
        }}
        untriggered={() => {}}
      >
        <VibrationMotorModule
          pin={13}
          val={value}
          isOn={true}
        />
      </Button>
    </Board>
  )
}
render(<App />)
