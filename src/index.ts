export { board } from './procedure/utils/board'
//------------utils-----------------//
export { render } from './declarative/rendere/render'
export { delay } from './procedure/utils/delay'

//-----------declarative----------------//
export { Board } from './declarative/utils/Board'
export { Led } from './declarative/components/output/Led'
export { Buzzer } from './declarative/components/output/Buzzer'
export { Button } from './declarative/components/input/Button'
export { Collision } from './declarative/components/input/Collision'
export { HallEffective } from './declarative/components/input/HallEffectSensor'
export { IRReceiver } from './declarative/components/input/IRReceiver'
export { PIRMotionSensor } from './declarative/components/input/PIRMotionSensor'
export { Servo } from './declarative/components/servo/Servo'

export type { SerialPort } from 'serialport'
 