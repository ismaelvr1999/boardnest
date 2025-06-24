import {
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { UseBoardContext } from "../boardContext";
import { updateColumnPosion } from "../board.api";

const UseBoard = () => {
  const { board, reloadBoard, setBoard } = UseBoardContext();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);

  const moveColumn = async (columnId:string,currentPosition: number, newPosition: number) => {
    if (!board) {
      return;
    }
    const tempBoard = { ...board };
    const currentColumn = tempBoard.boardColumns[Number(currentPosition) - 1];

    const startIndex =
      currentPosition >= Number(newPosition)
        ? Number(newPosition) - 1
        : Number(newPosition) - 2;
    tempBoard.boardColumns = tempBoard.boardColumns.filter(
      (column) => column.id !== currentColumn.id
    );
    tempBoard.boardColumns.splice(startIndex, 0, currentColumn);
    setBoard(tempBoard);
  
    if (currentPosition >= newPosition) {
        await updateColumnPosion(columnId, Number(newPosition));
      } else {
        await updateColumnPosion(columnId, Number(newPosition) - 1);
      }
      await reloadBoard();
  };

  const moveTask = (taskId:string,currentColumnId:string,newColumnId:string,currentPosition:string,newPosition:string) =>{
    if (!board) {
      return;
    }

  }

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    const { over, active } = event;
    const currentPosition = active.data.current?.position;
    const droppableRole = over.data.current?.role;
    const draggableRole = active.data.current?.role;
    const newPosition = over.data.current?.position;
    const elementId = String(active.id);

    if(draggableRole ==="column" && droppableRole=="droppable-column") {
      await moveColumn(elementId,currentPosition,newPosition);
    }
    else if (draggableRole ==="task" && droppableRole=="droppable-task"){
      const currentColumnId =  active.data.current?.columnId;
      const newColumnId =  active.data.current?.columnId;
      moveTask(elementId,currentColumnId,newColumnId,currentPosition,newPosition);
    }
    else{

    }
    

  };

  return { handleDragEnd, sensors };
};

export default UseBoard;
