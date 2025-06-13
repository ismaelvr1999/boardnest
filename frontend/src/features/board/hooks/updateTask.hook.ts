import { useForm, type SubmitHandler } from "react-hook-form";
import { updateTask } from "../board.api";
import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";
import type { ITask, UpdateTaskFormApi } from "../board.types";
import { useEffect } from "react";

const useUpdateTask = (task: ITask) => {
  const { reloadBoard } = UseBoardContext();

  const onUpdateTaskName: SubmitHandler<UpdateTaskFormApi> = async (d) => {
    try {
      await updateTask(d.id, d.name);
      await reloadBoard();
      toast.success("task name updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const { register, handleSubmit, reset } = useForm<UpdateTaskFormApi>({
    defaultValues: {
      name: task.name,
      id: task.id,
    },
  });

  useEffect(() => {
    reset({
      name: task.name,
      id: task.id,
    });
  }, [task]);
  return { onUpdateTaskName, register, handleSubmit, reset };
};

export default useUpdateTask;
