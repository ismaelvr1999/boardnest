import { useDroppable } from "@dnd-kit/core"
import { UseBoardContext } from "../boardContext";
import { useEffect, useState } from "react";

const DroppableTask = ({position,taskId,columnId}:{position:number,taskId:string,columnId:string})=>{
    const {currentDraggableRole} = UseBoardContext();
    const [className, setClassName] = useState("w-full h-4 shrink-0");
    const {isOver,setNodeRef} = useDroppable({
        id: `${taskId}-${position}`,
        data:{
            position,
            role:"droppable-task",
            columnId
        }
    });
    useEffect(()=>{
        if(currentDraggableRole == "task" && isOver) {
            setClassName("w-full h-4 shrink-0 bg-white/10");
        }
        else {
            setClassName("w-full h-4 shrink-0");
        }
    },[isOver]);

    return (
        <div className={className} ref={setNodeRef} >

        </div>
    )
}

export default DroppableTask;