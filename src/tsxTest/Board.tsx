// Board.tsx
import React, { useEffect, useState, createContext, useContext } from "react";
import { board } from "../utils/board";
import { SerialPort } from "serialport";

const BoardContext = createContext<SerialPort | null>(null);

export const useBoard = () => {
  return useContext(BoardContext);
};

interface BoardProps {
  children: React.ReactNode;
}

export const Board: React.FC<BoardProps> = ({ children }) => {
  const [port, setPort] = useState<SerialPort | null>(null);

  useEffect(() => {
    board.connectManual("/dev/ttyUSB0");
    board.on("ready", (port) => {
      console.log("Board is ready!");
      setPort(port);
    });
  }, []);

  return <BoardContext.Provider value={port}>{children}</BoardContext.Provider>;
};
