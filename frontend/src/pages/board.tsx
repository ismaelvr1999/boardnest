import Column from "../features/board/components/column";
import Modal from "../components/modal";
import useModal from "../hooks/modal.hook";
import UpdateBoardForm from "../features/board/components/updateBoardForm";
import Header from "../features/board/components/header";
import AddColumnForm from "../features/board/components/addColumnForm";
import AddColumnButton from "../features/board/components/addColumnButton";
import Toast from "../components/toast";
import { UseBoardContext } from "../features/board/boardContext";

const Board = () => {
  const {board} = UseBoardContext();
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
            return <Column column={column} key={key} />;
          })}
        <AddColumnButton handleOpenModal={handleOpenAddBoard} />
      </div>
      {/*update name or description form*/}
      <Modal
        isHidden={isHiddenUpdateBoard}
        handleClose={handleCloseUpdateBoard}
      >
        <UpdateBoardForm />
      </Modal>
      {/*add column form*/}
      <Modal isHidden={isHiddenAddBoard} handleClose={handleCloseAddBoard}>
        <AddColumnForm />
      </Modal>
      <Toast />
    </div>
  );
};

export default Board;
