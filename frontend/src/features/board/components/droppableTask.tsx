import useDroppableTask from "../hooks/droppableTask.hook";

const DroppableTask = ({ position, taskId, columnId, columnPosition }: { position: number, taskId: string, columnId: string, columnPosition: number }) => {
    const { className, setNodeRef } = useDroppableTask(taskId, position, columnId, columnPosition);
    return (
        <div className={className} ref={setNodeRef} >

        </div>
    )
}

export default DroppableTask;