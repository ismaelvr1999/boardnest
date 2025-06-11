import type { SubmitHandler } from "react-hook-form";
import { deleteTask, updateTask } from "./board.api";
import { toast } from "react-toastify";
import { UseBoardContext } from "./boardContext";
import type { UpdateTaskFormApi } from "./board.types";

const useTask = () => {
  const { reloadBoard } = UseBoardContext();
  const onDeleteTask = async (taksId: string) => {
    try {
      await deleteTask(taksId);
      await reloadBoard();
      toast.success("task deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onUpdateTaskName: SubmitHandler<UpdateTaskFormApi> = async (d) => {
    try {
      await updateTask(d.id, d.name);
      await reloadBoard();
      toast.success("task name updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {onDeleteTask,onUpdateTaskName};
};

export default useTask;
