import Column from "../features/board/components/column";
import Modal from "../components/modal";
import useModal from "../hooks/modal.hook";
import UpdateBoardForm from "../features/board/components/updateBoardForm";
import Header from "../features/board/components/header";
import AddColumnForm from "../features/board/components/addColumnForm";
import AddColumnButton from "../features/board/components/addColumnButton";
import Toast from "../components/toast";
import { UseBoardContext } from "../features/board/boardContext";
import {DndContext} from "@dnd-kit/core";
import DroppableColumn from "../features/board/components/droppableColumn";
import UseBoard from "../features/board/hooks/board.hook";

const Board = () => {
  const { board,handleDragStart } = UseBoardContext();
  const {handleDragEnd,sensors} = UseBoard(); 

  const {
    isHidden: isHiddenUpdateBoard,
    handleOpen: handleOpenUpdateBoard,
    handleClose: handleCloseUpdateBoard,
  } = useModal();
  const {
    isHidden: isHiddenAddColumn,
    handleOpen: handleOpenAddColumn,
    handleClose: handleCloseAddColumn,
  } = useModal();

  return (
    <div className="h-full w-full pt-7 grid grid-rows-[auto_1fr]">
      {/* Title and settings */}
      <Header
        handleOpen={handleOpenUpdateBoard}
        name={board ? board.name : ""}
      />
      {/*columns container*/}
      <div className="flex gap-0 pt-4 h-full overflow-x-auto">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart} > 
          {board &&
            board.boardColumns.map((column, key) => {
              return <Column column={column} key={key} />;
            })}
          {board && board.totalColumns > 0 && <DroppableColumn position={board.totalColumns+1} />}
        </DndContext>
        <AddColumnButton handleOpenModal={handleOpenAddColumn} />
      </div>
      {/*update name or description form*/}
      <Modal
        isHidden={isHiddenUpdateBoard}
        handleClose={handleCloseUpdateBoard}
      >
        <UpdateBoardForm />
      </Modal>
      {/*add column form*/}
      <Modal isHidden={isHiddenAddColumn} handleClose={handleCloseAddColumn}>
        <AddColumnForm />
      </Modal>
      <Toast />
    </div>
  );
};

export default Board;
