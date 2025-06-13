import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";
import { deleteColumn,addTask } from "../board.api";
import type { SubmitHandler } from "react-hook-form";
import type {AddTaskFormApi } from "../board.types";
const useColumn = ()=> {
    const {reloadBoard} = UseBoardContext();

    const onDeleteColumn = async (columnId: string) => {
        try {
          await deleteColumn(columnId);
          await reloadBoard();
          toast.success("Column deleted");
        } catch (error) {
          toast.error((error as Error).message);
        }
      };

      const onAddTask: SubmitHandler<AddTaskFormApi> = async (d) => {
        try {
          await addTask(d);
          await reloadBoard();
          toast.success("task added");
        } catch (error) {
          toast.error((error as Error).message);
        }
      };

      return {onDeleteColumn,onAddTask};    
};
export default useColumn;