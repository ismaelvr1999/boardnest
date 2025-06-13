import { deleteTask } from "../board.api";
import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";

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

  return { onDeleteTask };
};

export default useTask;
