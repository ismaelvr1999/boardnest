import Task from "./task";
import useModal from "../../../hooks/modal.hook";
import Modal from "../../../components/modal";
import UpdateColumnForm from "./updateColumnForm";
import AddTaskButton from "./addTaskButton";
import AddTaskForm from "./addTaskForm";
import useColumn from "../hooks/column.hook";
import type { IColumn } from "../board.types";
import DroppableColumn from "./droppableColumn";
import DroppableTask from "./droppableTask";
import DeleteIcon from "../../../components/icons/deleteIcon";
import EditIcon from "../../../components/icons/editIcon";
import DragIcon from "../../../components/icons/dragIcon";

const Column = ({ column }: { column: IColumn }) => {
  const { onDeleteColumn, attributes, listeners, setNodeRef, style } = useColumn(column.id, column.position);
  const {
    isHidden: isHiddenUpdateColumn,
    handleOpen: handleOpenUpdateColumn,
    handleClose: handleCloseUpdateColumn,
  } = useModal();

  const {
    isHidden: isHiddenAddTask,
    handleOpen: handleOpenAddTask,
    handleClose: handleCloseAddTask,
  } = useModal();
  return (
    <>
      <DroppableColumn position={column.position} />
      <div
        ref={setNodeRef}
        style={style}
        className={`flex flex-col h-fit w-90 border relative rounded-xl p-4 bg-[#1E1E1E] shrink-0 shadow-lg/20 shadow-white`}
      > 
        <div className="flex">
          {/* Delete, Update and Drag column*/}
          <h1 className="text-2xl font-bold h-fit">{column.name}</h1>
          <button
            className="text-red-300 cursor-pointer ml-auto hover:text-red-400 hover:scale-105 transform transition-transform duration-200 ease-in-out"
            onClick={() => onDeleteColumn(column.id)}
          >
            <DeleteIcon height={30} width={30} />
          </button>
          <button
            className="text-blue-300 cursor-pointer ml-4 hover:text-blue-400 hover:scale-105 transform transition-transform duration-200 ease-in-out"
            onClick={handleOpenUpdateColumn}
          >
            <EditIcon height={30} width={30} />
          </button>

          <button
            className="cursor-grab ml-2"
            {...listeners}
            {...attributes}
          >
            <DragIcon height={30} width={30} />
          </button>
        </div>
        {/* Tasks */}
        <div className="overflow-y-auto">
          {column.tasks.map((task, key) => {
            return <Task key={key} task={task} columnPosition={column.position} />;
          })}
          {column.totalTasks > 0 ?
            <DroppableTask columnPosition={column.position} position={column.totalTasks + 1} taskId={column.tasks[column.totalTasks - 1].id} columnId={column.id} />
            : <DroppableTask columnPosition={column.position} position={0} taskId={column.id + "1"} columnId={column.id} />
          }
        </div>

        <AddTaskButton handleOpenModal={handleOpenAddTask} />
      </div>
      {/* Update Column Modal */}
      <Modal
        handleClose={handleCloseUpdateColumn}
        isHidden={isHiddenUpdateColumn}
      >
        <UpdateColumnForm column={column} />
      </Modal>
      {/* Add task Modal */}
      <Modal handleClose={handleCloseAddTask} isHidden={isHiddenAddTask}>
        <AddTaskForm column={column} />
      </Modal>
    </>
  );
};

export default Column;
