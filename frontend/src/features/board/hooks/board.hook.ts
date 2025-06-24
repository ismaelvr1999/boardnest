import {
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { UseBoardContext } from "../boardContext";
import { updateColumnPosition, updateTaskPosition } from "../board.api";

const UseBoard = () => {
  const { board, reloadBoard, setBoard } = UseBoardContext();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);

  const moveColumn = async (columnId: string, currentPosition: number, newPosition: number) => {
    if (!board) {
      return;
    }
    const tempBoard = { ...board };
    const currentColumn = tempBoard.boardColumns[currentPosition - 1];

    const startIndex =
      currentPosition >= newPosition
        ? newPosition - 1
        : newPosition - 2;
    tempBoard.boardColumns = tempBoard.boardColumns.filter(
      (column) => column.id !== currentColumn.id
    );
    tempBoard.boardColumns.splice(startIndex, 0, currentColumn);
    setBoard(tempBoard);

    if (currentPosition >= newPosition) {
      await updateColumnPosition(columnId, newPosition);
    } else {
      await updateColumnPosition(columnId, newPosition - 1);
    }
    await reloadBoard();
  };

  const moveTask = async (
    taskId: string, 
    currentColumnId: string, 
    newColumnId: string, 
    currentPosition: number, 
    newPosition: number, 
    currentColumnPosition: number) => {
    if (!board) {
      return;
    }
    let tempBoard = { ...board };
    if (newColumnId !== currentColumnId) {
      return;
    }
    else {
      let currentColumn = { ...tempBoard.boardColumns[currentColumnPosition - 1] };
      const currentTask = currentColumn.tasks[currentPosition - 1];
      currentColumn.tasks = currentColumn.tasks.filter(task => task.id !== taskId);
      const startIndex =
        currentPosition >= newPosition
          ? newPosition - 1
          : newPosition - 2;
      currentColumn.tasks.splice(startIndex, 0, currentTask);
      tempBoard.boardColumns[currentColumnPosition - 1] = currentColumn;
      setBoard(tempBoard);
    }
    if (currentPosition >= newPosition) {
      await updateTaskPosition(taskId, newPosition, newColumnId);
    } else {
      await updateTaskPosition(taskId, newPosition - 1, newColumnId);
    }
    await reloadBoard();
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

    if (draggableRole === "column" && droppableRole == "droppable-column") {
      await moveColumn(elementId, currentPosition, newPosition);
    }
    else if (draggableRole === "task" && droppableRole == "droppable-task") {
      const currentColumnId = active.data.current?.columnId;
      const newColumnId = over.data.current?.columnId;
      const currentColumnPosition = active.data.current?.columnPosition
      moveTask(elementId, currentColumnId, newColumnId, currentPosition, newPosition, currentColumnPosition);
    }
    else {

    }


  };

  return { handleDragEnd, sensors };
};

export default UseBoard;
