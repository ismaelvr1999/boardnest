import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";
import { deleteColumn, addTask } from "../board.api";
import type { SubmitHandler } from "react-hook-form";
import type { AddTaskFormApi } from "../board.types";
import { useDraggable } from "@dnd-kit/core";

const useColumn = (id: string, position: number) => {
  const { reloadBoard } = UseBoardContext();

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

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      id,
      position,
      role: "column",
    },
  });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 1,
    }
    : undefined;

  return { onDeleteColumn, onAddTask, attributes, listeners, setNodeRef, style };
};
export default useColumn;