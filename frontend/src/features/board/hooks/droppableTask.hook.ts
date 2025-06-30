import { useDroppable } from "@dnd-kit/core"
import { UseBoardContext } from "../boardContext";
import { useEffect, useState } from "react";

const useDroppableTask = (taskId: string, position: number, columnId: string, columnPosition: number) => {
    const { currentDraggableRole } = UseBoardContext();
    const [className, setClassName] = useState("w-full h-4 shrink-0");
    
    const { isOver, setNodeRef } = useDroppable({
        id: `${taskId}-${position}`,
        data: {
            position,
            role: "droppable-task",
            columnId,
            columnPosition
        }
    });

    useEffect(() => {
        if (currentDraggableRole == "task" && isOver) {
            setClassName("w-full h-4 shrink-0 bg-white/10");
        }
        else {
            setClassName("w-full h-4 shrink-0");
        }
    }, [isOver]);
    return {className, setNodeRef}; 
}

export default useDroppableTask;