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
export { PIRMotionSensor } from './declarative/components/input/PIRMotionSensor'
export { Servo } from './declarative/components/servo/Servo'
export { DigitalTileSensor } from './declarative/components/input/DigitalTileSensor'
export { InfraredObstacleAvoidance } from './declarative/components/input/InfraredObstacleAvoidance'
export { PhotoInterrupter } from './declarative/components/input/PhotoInterrupter'
export { VibrationMotorModule } from './declarative/components/PWM/VibrationMotorModule'
export { Output } from './declarative/components/output/Output'
export { RGBLed } from './declarative/components/PWM/RGBLed'

export type { SerialPort } from 'serialport'
