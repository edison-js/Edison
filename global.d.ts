import { Led } from "./src/types/LED";
import { Sensor } from "./src/types/Sensor";
import { ServoMotor } from "./src/types/ServoMotor";

// write here all pin mode 
export type Output = Led | Sensor
export type Servo = ServoMotor

export type Mode = 'Servo' | 'Output' | 'Input' | 'Pwm' ;