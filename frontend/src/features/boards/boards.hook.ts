import { deleteBoard, getBoards } from "./boards.api";
import { useEffect, useState} from "react";
import type { Board } from "./boards.types";
import { toast } from "react-toastify";

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>();

  useEffect(() => {
    getBoards()
      .then((resp) => {
        setBoards(resp.data.boards);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleDelete = async (id:string) => {
    try {
      await deleteBoard(id);
      toast.success("board deleted");
      const respBoards = await getBoards();
      setBoards(respBoards.data.boards);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { boards,handleDelete};
};
