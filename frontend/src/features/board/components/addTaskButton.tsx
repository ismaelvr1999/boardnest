import type { MouseEventHandler } from "react";
const AddTaskButton = ({
  handleOpenModal,
}: {
  handleOpenModal: MouseEventHandler;
}) => {
  return (
    <div className="flex justify-between h-fit w-full border rounded-xl p-4 my-4">
      <h1 className="text-2xl h-fit">Add Task</h1>
      <button className="text-2xl cursor-pointer" onClick={handleOpenModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
        </svg>
      </button>
    </div>
  );
};

export default AddTaskButton;
