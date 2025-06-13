import Modal from "../../../components/modal";
import useModal from "../../../hooks/modal.hook";
import type { ITask } from "../board.types";
import UpdateTaskForm from "./updateTaskForm";
import useTask from "../hooks/task.hook";
const Task = ({ task }: {task:ITask}) => {
  const {onDeleteTask} =useTask()
  const {
    isHidden: isHiddenUpdateTask,
    handleOpen: handleOpenUpdateTask,
    handleClose: handleCloseUpdateTask,
  } = useModal();
  return (
    <>
      <div className="w-full h-fit border rounded-xl p-2 my-3">
        <p className="text-xl mb-2">{task.name}</p>
        <div className="flex justify-between">
          <button
            className="text-red-300 cursor-pointer"
            onClick={() => onDeleteTask(task.id)}
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
            className="text-blue-300 cursor-pointer"
            onClick={handleOpenUpdateTask}
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
