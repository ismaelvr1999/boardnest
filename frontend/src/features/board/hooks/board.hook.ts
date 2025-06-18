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

  const moveColumn = (currentPosition: number, newPosition: number) => {
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
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    const { over, active } = event;
    const currentPosition = active.data.current?.position;
    const newPosition = over.data.current?.position;
    const columnId = String(active.id);
    moveColumn(currentPosition, newPosition);
    if (currentPosition >= newPosition) {
      await updateColumnPosion(columnId, Number(newPosition));
    } else {
      await updateColumnPosion(columnId, Number(newPosition) - 1);
    }

    await reloadBoard();
  };

  return { handleDragEnd, sensors };
};

export default UseBoard;
