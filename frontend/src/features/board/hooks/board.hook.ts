import {
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { UseBoardContext } from "../boardContext";
import { updateColumnPosition, updateTaskPosition } from "../board.api";
import { DraggrableColumnSchema, DraggrableTaskSchema, DroppableColumnSchema, DroppableTaskSchema } from "../board.schemas";
import type { DraggrableTaskType, DroppableTaskType } from "../board.types";

const UseBoard = () => {
  const { board, reloadBoard, setBoard, setCurrentDraggableRole } = UseBoardContext();
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
    // Create copies of board and column objects to avoid mutating the originals
    const tempBoard = { ...board };
    const currentColumn = {...tempBoard.boardColumns[currentPosition - 1]};
    const startIndex =
      currentPosition >= newPosition
        ? newPosition - 1 // dragging right-to-left
        : newPosition - 2; // dragging left-to-righ
    // Remove column from its current position
    tempBoard.boardColumns = tempBoard.boardColumns.filter(
      (column) => column.id !== currentColumn.id
    );
    // Insert column in its new position
    tempBoard.boardColumns.splice(startIndex, 0, currentColumn);
    setBoard(tempBoard); // Refresh client board to avoid lag
    // Move column in backend;  
    if (currentPosition >= newPosition) {
      await updateColumnPosition(columnId, newPosition);
    } else {
      await updateColumnPosition(columnId, newPosition - 1);
    }
    await reloadBoard(); // Sync client board with updated data
  };

  const moveTask = async (draggableTask:DraggrableTaskType,droppableTask:DroppableTaskType) => {
    if (!board) {
      return;
    }
    // Create copies of board, task, and column objects to avoid mutating the originals
    let tempBoard = { ...board };
    let currentColumn = { ...tempBoard.boardColumns[draggableTask.columnPosition - 1] };
    let newColumn = { ...tempBoard.boardColumns[droppableTask.columnPosition - 1] };
    const currentTask = { ...currentColumn.tasks[draggableTask.position - 1] };
    currentColumn.tasks = currentColumn.tasks.filter(task => task.id !== draggableTask.id);
    // Move task from one column to another
    if (droppableTask.columnId !== draggableTask.columnId) {
      // If the target column is empty
      if(droppableTask.position === 0){
        newColumn.tasks = [currentTask]; // Place task as the first item
        droppableTask.position = 1;
      }
      else {
        //Insert task
        newColumn.tasks.splice(droppableTask.position - 1, 0, currentTask);
      }
      //Update the columns
      newColumn.totalTasks ++;
      currentColumn.totalTasks --;
      tempBoard.boardColumns[droppableTask.columnPosition - 1] = newColumn;
      tempBoard.boardColumns[draggableTask.columnPosition - 1] = currentColumn;
      setBoard(tempBoard); // Refresh client board to avoid lag
      // Move task in backend;  
      await updateTaskPosition(draggableTask.id,droppableTask.position, droppableTask.columnId);
      await reloadBoard(); // Sync client board with updated data
    }
    // Change task position in the same column
    else {
      const startIndex =
        draggableTask.position >= droppableTask.position
          ? droppableTask.position - 1 // Dragged downward
          : droppableTask.position - 2; // //Dragged upward
      //insert task in its new position 
      currentColumn.tasks.splice(startIndex, 0, currentTask); 
      tempBoard.boardColumns[draggableTask.columnPosition - 1] = currentColumn;
      setBoard(tempBoard); // Refresh client board to avoid lag
      // Move task in backend;  
      if (draggableTask.position >= droppableTask.position) {
        await updateTaskPosition(draggableTask.id, droppableTask.position, droppableTask.columnId);
      } else {
        await updateTaskPosition(draggableTask.id, droppableTask.position -1, droppableTask.columnId);
      }
      await reloadBoard(); // Sync client board with updated data
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    let { current: draggable } = event.active.data;
    let { current: droppable } = event.over.data;
    // Move column if it was dropped in a column drop area
    if (draggable?.role === "column" && droppable?.role == "droppable-column") {
      draggable = DraggrableColumnSchema.safeParse(draggable);
      droppable = DroppableColumnSchema.safeParse(droppable);
      await moveColumn(draggable.data.id, draggable.data.position, droppable.data.position);
    }
    // Move task if it was dropped in a task drop area
    else if (draggable?.role === "task" && droppable?.role == "droppable-task") {
      draggable = DraggrableTaskSchema.safeParse(draggable);
      droppable = DroppableTaskSchema.safeParse(droppable);
      await moveTask(draggable.data,droppable.data);
    }
    setCurrentDraggableRole(undefined);
  };

  return { handleDragEnd, sensors };
};

export default UseBoard;
