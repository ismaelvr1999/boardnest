import { useDroppable } from "@dnd-kit/core"
import { UseBoardContext } from "../boardContext";
import { useEffect, useState } from "react";

const useDroppableColumn = (position: number) => {
    const { currentDraggableRole } = UseBoardContext();
    const [className, setClassName] = useState("w-4 h-full shrink-0");
    const { isOver, setNodeRef } = useDroppable({
        id: `droppableColumn-${position}`,
        data: {
            position,
            role: "droppable-column"
        }
    });
    useEffect(() => {
        if (currentDraggableRole == "column" && isOver) {
            setClassName("w-4 h-full shrink-0 bg-white/10");
        }
        else {
            setClassName("w-4 h-full shrink-0");
        }
    }, [isOver]);

    return { className, setNodeRef };
}

export default useDroppableColumn;