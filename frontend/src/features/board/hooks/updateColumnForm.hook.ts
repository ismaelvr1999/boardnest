import { useForm, type SubmitHandler } from "react-hook-form";
import type { IColumn, UpdateColumnNameApi } from "../board.types";
import { updateColumn } from "../board.api";
import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";
import { useEffect } from "react";

const useUpdateColumnForm = (column:IColumn) => {
  const { reloadBoard } = UseBoardContext();
  const onUpdateColumnName: SubmitHandler<UpdateColumnNameApi> = async (d) => {
    try {
      await updateColumn(d.id, d.name);
      await reloadBoard();
      toast.success("column name updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateColumnNameApi>({
    defaultValues: {
      name: column.name,
      id: column.id,
    },
  });

  useEffect(() => {
    reset({
      name: column.name,
      id: column.id,
    });
  }, [column]);

  return {register, handleSubmit, onUpdateColumnName}

};

export default useUpdateColumnForm;
