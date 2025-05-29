import { deleteBoard, getBoard } from "./boards.api";
import { useEffect, useState } from "react";
import type { Board } from "./boards.types";
import { toast } from "react-toastify";
export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>();

  useEffect(() => {
    getBoard()
      .then((resp) => {
        setBoards(resp.data.boards);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleDelete = (boardId:string) => {
    
    return async (e: Event) => {
      e.preventDefault();
      try {
        await deleteBoard(boardId);
      } catch (error) {
        if(error instanceof Error)
        toast.error(error.message);
      }
    };
  };

  return {boards,handleDelete};
};
