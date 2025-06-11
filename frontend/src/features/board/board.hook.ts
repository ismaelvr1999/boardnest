import {
  addColumn,
  updateBoard
} from "./board.api";
import { toast } from "react-toastify";
import type {AddColumnApi} from "./board.types";
import type { SubmitHandler } from "react-hook-form";
import type { UpdateBoardApi } from "./board.types";
import { UseBoardContext } from "./boardContext";
const useBoard = () => {
  const {board,reloadBoard} = UseBoardContext();

  const onUpdate: SubmitHandler<UpdateBoardApi> = async (d) => {
    try {
      if (typeof board=== "undefined") return;
      await updateBoard(board.id, d);
      await reloadBoard();
      toast.success("board updated");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const onAddColumn: SubmitHandler<AddColumnApi> = async (d) => {
    try {
      await addColumn(d);
      toast.success("column added");
      await reloadBoard();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    board,
    onUpdate,
    onAddColumn,
  };
};
export default useBoard;
