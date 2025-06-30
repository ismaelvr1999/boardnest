import Modal from "../../../components/modal";
import useModal from "../../../hooks/modal.hook";
import type { ITask } from "../board.types";
import UpdateTaskForm from "./updateTaskForm";
import useTask from "../hooks/task.hook";
import DroppableTask from "./droppableTask";
import EditIcon from "../../../components/icons/editIcon";
import DeleteIcon from "../../../components/icons/deleteIcon";
import DragIcon from "../../../components/icons/dragIcon";
const Task = ({ task, columnPosition }: { task: ITask, columnPosition: number }) => {
  const { 
    onDeleteTask, 
    attributes, 
    listeners, 
    setNodeRef, 
    style } = useTask(task.id, task.position, task.ColumnId, columnPosition);

  const {
    isHidden: isHiddenUpdateTask,
    handleOpen: handleOpenUpdateTask,
    handleClose: handleCloseUpdateTask,
  } = useModal();
  return (
    <>
      <DroppableTask columnPosition={columnPosition} position={task.position} taskId={task.id} columnId={task.ColumnId} />
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
            className="text-red-300 cursor-pointer hover:text-red-400 hover:scale-105 transform transition-transform duration-200 ease-in-out"
            onClick={() => onDeleteTask(task.id)}
          >
            <DeleteIcon height={30} width={30} />
          </button>
          <button
            className="text-blue-300 cursor-pointer hover:text-blue-400 hover:scale-105 transform transition-transform duration-200 ease-in-out"
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
