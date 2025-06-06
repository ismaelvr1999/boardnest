import useBoard from "../features/board/board.hook";
import Column from "../features/board/components/column";
import Modal from "../components/modal";
import useModal from "../hooks/modal.hook";
import UpdateBoardForm from "../features/board/components/updateBoardForm";
import { useForm } from "react-hook-form";
import type { UpdateBoardApi,AddColumnApi } from "../features/board/board.types";
import { useEffect } from "react";
import Header from "../features/board/components/header";
import Toast from "../components/toast";

const Board = () => {
  const { board, onUpdate,id,onAddColumn } = useBoard();
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
  const { register:registerUpdateBoard, reset:resetUpdateBoard, handleSubmit:handleSubmitUpdateBoard} = useForm<UpdateBoardApi>();
  const { register:registerAddBoard,reset:resetAddColumn, handleSubmit:handleSubmitAddColumn } = useForm<AddColumnApi>();

  useEffect(() => {
    resetUpdateBoard({
      name: board ? board.name : "",
      description: board ? board.description : "",
    });
    resetAddColumn({
      BoardId:id
    })
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
            return <Column name={column.name} key={key} />;
          })}
        <Modal isHidden={isHiddenAddBoard} handleClose={handleCloseAddBoard}>
          <form onSubmit={handleSubmitAddColumn(onAddColumn)}>
            <h1 className="text-3xl font-bold mb-4">Add column</h1>
            <p className="text-lg">Name</p>
            <input
              {...registerAddBoard("name")}
              type="text"
              className="block border border-white w-full  text-sm text-[#B5B5B5] p-4 rounded-lg my-2"
              placeholder="Enter board name"
            />

            <input
              {...registerAddBoard("BoardId")}
              type="hidden"
            />
            <button className="p-2 bg-green-500  text-lg my-2 text-center rounded-lg cursor-pointer ">
              Add
            </button>
            <Toast />
          </form>
          
        </Modal>

        <div className="flex justify-between h-fit w-90 border rounded-xl p-4 shrink-0">
          <h1 className="text-2xl h-fit">Add column</h1>
          <button
            className="text-2xl cursor-pointer"
            onClick={handleOpenAddBoard}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
              ></path>
            </svg>
          </button>
        </div>
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
    </div>
  );
};

export default Board;
