import Modal from "../../../components/modal";
import useModal from "../../../hooks/modal.hook";
import type { ITask } from "../board.types";
import UpdateTaskForm from "./updateTaskForm";
import useTask from "../hooks/task.hook";
import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties } from 'react';
import DroppableTask from "./droppableTask";
import EditIcon from "../../../components/icons/editIcon";
import DeleteIcon from "../../../components/icons/deleteIcon";
import DragIcon from "../../../components/icons/dragIcon";
const Task = ({ task,columnPosition }: {task:ITask,columnPosition:number}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${task.id}`,
    data: {
      position: task.position,
      columnPosition,
      role: "task",
      columnId: task.ColumnId
    },
  });

  const style: CSSProperties | undefined = transform
  ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      position: 'absolute',
      zIndex: 1,
    }
  : undefined;

  const {onDeleteTask} =useTask()
  const {
    isHidden: isHiddenUpdateTask,
    handleOpen: handleOpenUpdateTask,
    handleClose: handleCloseUpdateTask,
  } = useModal();
  return (
    <>
      <DroppableTask columnPosition={columnPosition} position={task.position} taskId={task.id} columnId={task.ColumnId}/>
      <div style={style} className="w-full h-fit bg-[#1E1E1E] border rounded-xl p-2" ref={setNodeRef}>
        <div className="flex">
          <p className="text-xl mb-2">{task.name}</p>
          <button
            className="cursor-grab ml-auto"
            {...listeners}
            {...attributes}
          >
            <DragIcon width={25} height={25} />
          </button>
        </div>
        <div className="flex justify-between">
          <button
            className="text-red-300 cursor-pointer"
            onClick={() => onDeleteTask(task.id)}
          >
            <DeleteIcon height={30} width={30} />
          </button>
          <button
            className="text-blue-300 cursor-pointer"
            onClick={handleOpenUpdateTask}
          >
            <EditIcon height={30} width={30} />
          </button>
        </div>
      </div>
      <Modal isHidden={isHiddenUpdateTask} handleClose={handleCloseUpdateTask}>
        <UpdateTaskForm
          task={task}
        />
      </Modal>
    </>
  );
};
export default Task;
