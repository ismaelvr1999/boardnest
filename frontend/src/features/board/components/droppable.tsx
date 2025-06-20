import { useDroppable } from "@dnd-kit/core"
import { UseBoardContext } from "../boardContext";
import { useEffect, useState } from "react";

const Droppable= ({position}:{position:number})=>{
    const {currentDraggableRole} = UseBoardContext();
    const [className, setClassName] = useState("w-4 h-full shrink-0");
    const {isOver,setNodeRef} = useDroppable({
        id: `droppable-${position}`,
        data:{
            position,
            role:"droppable-column"
        }
    });
    useEffect(()=>{
        if(currentDraggableRole == "column" && isOver) {
            setClassName("w-4 h-full shrink-0 bg-white/10");
        }
        else {
            setClassName("w-4 h-full shrink-0")
        }
    },[isOver]);

    return (
        <div className={className} ref={setNodeRef} >

        </div>
    )
}

export default Droppable;