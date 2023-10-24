// Led.tsx
import { useEffect } from "react";
import { useBoard } from "./Board";
import { attachLed } from "../factory/output/uniqueDevice/led";

interface LedProps {
  pin: number;
  blinkDuration?: number;
}

export const Led: React.FC<LedProps> = ({ pin, blinkDuration }) => {
  const port = useBoard();

  useEffect(() => {
    if (port) {
      const led = attachLed(port, pin);
      if (blinkDuration) {
        led.blink(blinkDuration);
      }
    }
  }, [port, pin, blinkDuration]);

  return null; // This is a non-visual component
};
