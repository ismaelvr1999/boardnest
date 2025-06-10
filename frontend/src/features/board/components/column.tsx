import Task from "./task";
import type { ColumnProps } from "../board.types";
import { useForm } from "react-hook-form";
import type { UpdateColumnNameApi } from "../board.types";
import useModal from "../../../hooks/modal.hook";
import Modal from "../../../components/modal";
import UpdateColumnForm from "./updateColumnForm";

const Column = ({ name, id, onDeleteColumn, onUpdateColumn }: ColumnProps) => {
  const {
    register: registerUpdateColumn,
    handleSubmit: handleSubmitUpdateColumn
  } = useForm<UpdateColumnNameApi>({
    defaultValues: {
      name: name,
      id: id,
    },
  });

  const {
    isHidden: isHiddenUpdateColumn,
    handleOpen: handleOpenUpdateColumn,
    handleClose: handleCloseUpdateColumn,
  } = useModal();

  return (
    <>
      <div className="flex flex-col h-full w-90 border rounded-xl p-4 shrink-0 shadow-xl/15 shadow-white">
        <div className="flex">
          <h1 className="text-2xl font-bold h-fit">{name}</h1>
          <button
            className="text-red-300 cursor-pointer ml-auto"
            onClick={() => onDeleteColumn(id)}
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
        </div>
        <div className="overflow-y-auto">
          <Task />
        </div>
      </div>
      <Modal
        handleClose={handleCloseUpdateColumn}
        isHidden={isHiddenUpdateColumn}
      >
        <UpdateColumnForm
          handleSubmit={handleSubmitUpdateColumn}
          onUpdate={onUpdateColumn}
          register={registerUpdateColumn}
        />
      </Modal>
    </>
  );
};

export default Column;
