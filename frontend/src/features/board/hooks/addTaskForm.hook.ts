import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";
import { addTask } from "../board.api";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AddTaskFormApi, IColumn } from "../board.types";
import { useEffect } from "react";

const useAddTaskForm = (column:IColumn) => {
  const { reloadBoard } = UseBoardContext();
  const onAddTask: SubmitHandler<AddTaskFormApi> = async (d) => {
    try {
      await addTask(d);
      await reloadBoard();
      toast.success("task added");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const { register, handleSubmit,reset } = useForm<AddTaskFormApi>({
    defaultValues: {
      ColumnId: column.id,
      BoardId: column.BoardId,
    },
  });
  useEffect(() => {
    reset({
      ColumnId: column.id,
      BoardId: column.BoardId,
    });
  }, [column]);


  return {register,handleSubmit,onAddTask}
};

export default useAddTaskForm;
