import useBoard from "../features/board/board.hook";
import Column from "../features/board/components/column";
import Modal from "../components/modal";
import useModal from "../hooks/modal.hook";
import UpdateBoardForm from "../features/board/components/updateBoardForm";
import { useForm } from "react-hook-form";
import type {
  UpdateBoardApi,
  AddColumnApi,
} from "../features/board/board.types";
import { useEffect } from "react";
import Header from "../features/board/components/header";
import AddColumnForm from "../features/board/components/addColumnForm";
import AddColumnButton from "../features/board/components/addColumnButton";
import Toast from "../components/toast";

const Board = () => {
  const { board, onUpdate, id, onAddColumn, onDeleteColumn, updateColumnName } =
    useBoard();
  const {
    isHidden: isHiddenUpdateBoard,
    handleOpen: handleOpenUpdateBoard,
    handleClose: handleCloseUpdateBoard,
  } = useModal();
  const {
    isHidden: isHiddenAddBoard,
    handleOpen: handleOpenAddBoard,
    handleClose: handleCloseAddBoard,
  } = useModal();

  const {
    register: registerUpdateBoard,
    reset: resetUpdateBoard,
    handleSubmit: handleSubmitUpdateBoard,
  } = useForm<UpdateBoardApi>();
  const {
    register: registerAddBoard,
    reset: resetAddColumn,
    handleSubmit: handleSubmitAddColumn,
  } = useForm<AddColumnApi>();

  useEffect(() => {
    resetUpdateBoard({
      name: board ? board.name : "",
      description: board ? board.description : "",
    });
    resetAddColumn({
      BoardId: id,
    });
  }, [board]);

  return (
    <div className="h-full w-full pt-7 grid grid-rows-[auto_1fr]">
      {/* Title and settings */}
      <Header
        handleOpen={handleOpenUpdateBoard}
        name={board ? board.name : ""}
      />
      {/*columns container*/}
      <div className="flex gap-4 py-4 h-full overflow-x-auto">
        {board &&
          board.boardColumns.map((column, key) => {
            return (
              <Column
                id={column.id}
                onDeleteColumn={onDeleteColumn}
                name={column.name}
                key={key}
                onUpdateColumn={updateColumnName}
              />
            );
          })}
        <AddColumnButton handleOpenModal={handleOpenAddBoard} />
      </div>
      {/*update name or description form*/}
      <Modal
        isHidden={isHiddenUpdateBoard}
        handleClose={handleCloseUpdateBoard}
      >
        <UpdateBoardForm
          register={registerUpdateBoard}
          onUpdate={onUpdate}
          handleSubmit={handleSubmitUpdateBoard}
        />
      </Modal>
      {/*add column form*/}
      <Modal isHidden={isHiddenAddBoard} handleClose={handleCloseAddBoard}>
        <AddColumnForm
          handleSubmit={handleSubmitAddColumn}
          onAddColumn={onAddColumn}
          register={registerAddBoard}
        />
      </Modal>
      <Toast />
    </div>
  );
};

export default Board;
