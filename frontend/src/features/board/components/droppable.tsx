import { useDroppable } from "@dnd-kit/core"
const Droppable= ({position}:{position:number})=>{
    const {isOver,setNodeRef} = useDroppable({
        id: `droppable-${position}`,
        data:{
            position
        }
    });

    const classList = `w-4 h-full  shrink-0 ${isOver?'bg-white/10':''}`;
    return (
        <div className={classList} ref={setNodeRef} >

        </div>
    )
}

export default Droppable;