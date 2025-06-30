import type { MouseEventHandler } from "react";
import AddIcon from "../../../components/icons/addIcon";
const AddColumnButton = ({
  handleOpenModal,
}: {
  handleOpenModal: MouseEventHandler;
}) => {
  return (
    <div className="flex justify-between h-fit w-90 border rounded-xl p-4 shrink-0 shadow-lg/20 shadow-white">
      <h1 className="text-2xl h-fit">Add column</h1>
      <button className="text-2xl cursor-pointer" onClick={handleOpenModal}>
        <AddIcon width={30} height={30} />
      </button>
    </div>
  );
};

export default AddColumnButton;
