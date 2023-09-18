export type Mode = 'Servo' | 'Output' | 'Input' | 'Pwm' ;

export interface InputMode {
    mode: 'Input';
}

export interface OutputMode {
    mode: 'Output';
    // Output specific methods here
  }

export interface PwmMode {
    on: () => void;
    off: () => void;
  }

export interface ServoMode {
    lotate: (angle: number) => Promise<void>;
}

