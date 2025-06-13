import { useForm, type SubmitHandler } from "react-hook-form";
import type { AddColumnApi } from "../board.types";
import { addColumn } from "../board.api";
import { UseBoardContext } from "../boardContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const useAddColumnForm = () => {
  const { board, reloadBoard } = UseBoardContext();
  const onAddColumn: SubmitHandler<AddColumnApi> = async (d) => {
    try {
      await addColumn(d);
      toast.success("column added");
      await reloadBoard();
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const { register, reset, handleSubmit } = useForm<AddColumnApi>();

  useEffect(() => {
    reset({
      BoardId: board ? board.id : "",
    });
  }, [board]);

  return { onAddColumn, register, handleSubmit };
};

export default useAddColumnForm;
