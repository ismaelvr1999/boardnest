import { useDroppable } from "@dnd-kit/core"
const Droppable= ({id}:{id:number})=>{
    const {isOver,setNodeRef} = useDroppable({
        id: `droppable-${id}`
    });
    const classList = `w-4 h-full shrink-0 ${isOver?'bg-white/10':''}`;
    return (
        <div className={classList} ref={setNodeRef} >

        </div>
    )
}

export default Droppable;