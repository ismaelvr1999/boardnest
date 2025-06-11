import { toast } from "react-toastify";
import { UseBoardContext } from "./boardContext";
import { deleteColumn,updateColumn,addTask } from "./board.api";
import type { SubmitHandler } from "react-hook-form";
import type { UpdateColumnNameApi,AddTaskFormApi } from "./board.types";
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
      const onUpdateColumnName: SubmitHandler<UpdateColumnNameApi> = async (d) => {
        try {
          await updateColumn(d.id, d.name);
          await reloadBoard();
          toast.success("column name updated");
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

      return {onDeleteColumn,onUpdateColumnName,onAddTask};    
};
export default useColumn;