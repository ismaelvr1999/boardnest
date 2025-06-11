import { createContext, useContext, useState, useEffect } from "react";
import type {
  BoardContexType,
  BoardProviderType,
  BoardWithColumns,
} from "./board.types";
import { useParams } from "react-router-dom";
import { getBoard } from "./board.api";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
const BoardContext = createContext<BoardContexType>(null);

export const UseBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within a AuthProvider");
  return context;
};

export const BoardProvider: BoardProviderType = () => {
  const { id } = useParams<string>();
  const [board, setBoard] = useState<BoardWithColumns>();

  const reloadBoard = async () => {
    if (typeof id === "undefined") return;
    const data = await getBoard(id);
    setBoard(data);
  };

  useEffect(() => {
    try {
      if (typeof id === "undefined") return;
      const fetchBoard = async () => {
        const data = await getBoard(id);
        setBoard(data);
      };
      fetchBoard();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  return (
    <BoardContext.Provider value={{ reloadBoard, board, boardId: id }}>
      <Outlet/>
    </BoardContext.Provider>
  );
};
