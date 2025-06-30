import { deleteTask } from "../board.api";
import { toast } from "react-toastify";
import { UseBoardContext } from "../boardContext";
import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties } from 'react';

const useTask = (id:string,position:number,columnId:string,columnPosition:number) => {
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

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      id,
      position,
      columnPosition,
      role: "task",
      columnId
    },
  });

  const style: CSSProperties | undefined = transform
  ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      position: 'absolute',
      zIndex: 1,
    }
  : undefined;

  return { onDeleteTask, attributes, listeners, setNodeRef, style };
};

export default useTask;
