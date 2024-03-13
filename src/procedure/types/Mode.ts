export type Mode = 'Servo' | 'Output' | 'Input' | 'Pwm'

export type InputMode = {
  mode: 'Input'
}

export type OutputMode = {
  mode: 'Output'
}

export type PwmMode = {
  on: () => void
  off: () => void
}

export type ServoMode = {
  rotate: (angle: number) => Promise<void>
}
