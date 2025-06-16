import Column from "../features/board/components/column";
import Modal from "../components/modal";
import useModal from "../hooks/modal.hook";
import UpdateBoardForm from "../features/board/components/updateBoardForm";
import Header from "../features/board/components/header";
import AddColumnForm from "../features/board/components/addColumnForm";
import AddColumnButton from "../features/board/components/addColumnButton";
import Toast from "../components/toast";
import { UseBoardContext } from "../features/board/boardContext";
import { DndContext, useSensor,MouseSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { updateColumnPosion } from "../features/board/board.api";
//import { useState } from "react";

const Board = () => {
  const {reloadBoard} = UseBoardContext();
  //const [currentDrag,setCurrentDrag] = useState();
  const mouseSensor = useSensor(MouseSensor,{
    activationConstraint:{
      distance:5,
    }
  });
const handleDragEnd = async (event:DragEndEvent)=>{
    const {over,active} = event;
    if(!over){
      return;
    }
    const droppableId = String(over.id);
    const columnId = String(active.id);
    const [,newPosition] = droppableId.split('-')
    await updateColumnPosion(columnId,Number(newPosition));
    await reloadBoard();
  }

  const sensors = useSensors(mouseSensor);
  const { board } = UseBoardContext();
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
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {board &&
            board.boardColumns.map((column, key) => {
              return <Column column={column} key={key} />;
            })}
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
