import { useForm } from "react-hook-form";
import type { UpdateBoardApi } from "../board.types";
import type { SubmitHandler } from "react-hook-form";
import { updateBoard } from "../board.api";
import { UseBoardContext } from "../boardContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const useUpdateBoardForm = () => {
  const { board, reloadBoard } = UseBoardContext();
  const { register, reset, handleSubmit } = useForm<UpdateBoardApi>();

  const onUpdate: SubmitHandler<UpdateBoardApi> = async (d) => {
    try {
      if (typeof board === "undefined") return;
      await updateBoard(board.id, d);
      await reloadBoard();
      toast.success("board updated");
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  useEffect(() => {
    reset({
      name: board ? board.name : "",
      description: board ? board.description : "",
    });
  }, [board]);

  return { handleSubmit, onUpdate, register };
};

export default useUpdateBoardForm;
