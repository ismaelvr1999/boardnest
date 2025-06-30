import useDroppableColumn from "../hooks/droppableColumn.hook";

const DroppableColumn= ({position}:{position:number})=>{
    const {className, setNodeRef} = useDroppableColumn(position); 
    return (
        <div className={className} ref={setNodeRef} >

        </div>
    )
}

export default DroppableColumn;