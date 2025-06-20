import Task from "./task";
import useModal from "../../../hooks/modal.hook";
import Modal from "../../../components/modal";
import UpdateColumnForm from "./updateColumnForm";
import AddTaskButton from "./addTaskButton";
import AddTaskForm from "./addTaskForm";
import useColumn from "../hooks/column.hook";
import type { IColumn } from "../board.types";
import { useDraggable } from "@dnd-kit/core";
import Droppable from "./droppable";

const Column = ({ column }: { column: IColumn }) => {
  const { onDeleteColumn } = useColumn();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${column.id}`,
    data: {
      position: column.position,
      role: "column"
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1,
      }
    : undefined;

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
      <Droppable position={column.position}/>
      <div
        ref={setNodeRef}
        style={style}
        className="flex relative flex-col h-fit w-90 border rounded-xl p-4 bg-[#1E1E1E] shrink-0 shadow-lg/20 shadow-white"
      >
        <div className="flex">
          {/* Delete, Update and Drag column*/}
          <h1 className="text-2xl font-bold h-fit">{column.name}</h1>
          <button
            className="text-red-300 cursor-pointer ml-auto"
            onClick={() => onDeleteColumn(column.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
              ></path>
            </svg>
          </button>
          <button
            className="text-blue-300 cursor-pointer ml-4"
            onClick={handleOpenUpdateColumn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 19h1.098L16.796 8.302l-1.098-1.098L5 17.902zm-1 1v-2.52L17.18 4.288q.155-.137.34-.212T17.907 4t.39.064q.19.063.35.228l1.067 1.074q.165.159.226.35q.06.19.06.38q0 .204-.068.39q-.069.185-.218.339L6.519 20zM19.02 6.092l-1.112-1.111zm-2.782 1.67l-.54-.558l1.098 1.098z"
              ></path>
            </svg>
          </button>

          <button
            className="cursor-grab ml-2"
            {...listeners}
            {...attributes}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.5 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m1.5 5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M15.5 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m1.5 5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1.5 8a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
              ></path>
            </svg>
          </button>
        </div>
        {/* Tasks */}
        <div className="overflow-y-auto">
          {column.tasks.map((task, key) => {
            return <Task key={key} task={task} />;
          })}
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
