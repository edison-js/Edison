export type AnalogpinMapping = {
  A0: 0
  A1: 1
  A2: 2
  A3: 3
  A4: 4
  A5: 5
}

export type AnalogPin = keyof AnalogpinMapping

export const analogPinMapping: AnalogpinMapping = {
  A0: 0,
  A1: 1,
  A2: 2,
  A3: 3,
  A4: 4,
  A5: 5,
}

export type Sensor = 'on' | 'off' | 'below' | 'above' | 'stop'
