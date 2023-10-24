// App.tsx
import React from "react";
import { Board } from "./Board";
import { Led } from "./Led";

const App: React.FC = () => {
  return (
    <Board>
      <Led pin={13} blinkDuration={500} />
    </Board>
  );
};

export default App;
