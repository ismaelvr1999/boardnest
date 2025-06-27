import type { MouseEventHandler } from "react";
import AddIcon from "../../../components/icons/addIcon";
const AddTaskButton = ({
  handleOpenModal,
}: {
  handleOpenModal: MouseEventHandler;
}) => {
  return (
    <div className="flex justify-between h-fit w-full border rounded-xl p-4 my-4">
      <h1 className="text-2xl h-fit">Add Task</h1>
      <button className="text-2xl cursor-pointer" onClick={handleOpenModal}>
        <AddIcon height={30} width={30} />
      </button>
    </div>
  );
};

export default AddTaskButton;
