export interface Led{
    on?: () => void;
    off?: () => void;
    blink?: (ms: number) => void;
}

