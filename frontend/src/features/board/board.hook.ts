import { useEffect, useState } from "react";
import {
  addColumn,
  addTask,
  deleteColumn,
  getBoard,
  updateBoard,
  updateColumn,
  deleteTask,
  updateTask,
} from "./board.api";
import { toast } from "react-toastify";
import type {
  AddColumnApi,
  AddTaskFormApi,
  BoardWithColumns,
  UpdateColumnNameApi,
  UpdateTaskFormApi,
} from "./board.types";
import { useParams } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { UpdateBoardApi } from "./board.types";
const useBoard = () => {
  const { id } = useParams<string>();
  const [board, setBoard] = useState<BoardWithColumns>();

  const reloadBoard = async () => {
    if (typeof id === "undefined") return;
    const data = await getBoard(id);
    setBoard(data);
  };

  useEffect(() => {
    try {
      if (typeof id === "undefined") return;
      const fetchBoard = async () => {
        const data = await getBoard(id);
        setBoard(data);
      };
      fetchBoard();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  const onUpdate: SubmitHandler<UpdateBoardApi> = async (d) => {
    try {
      if (typeof id === "undefined") return;
      await updateBoard(id, d);
      await reloadBoard();
      toast.success("board updated");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const onAddColumn: SubmitHandler<AddColumnApi> = async (d) => {
    try {
      await addColumn(d);
      toast.success("column added");
      await reloadBoard();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const onDeleteColumn = async (columnId: string) => {
    try {
      await deleteColumn(columnId);
      await reloadBoard();
      toast.success("Column deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const updateColumnName: SubmitHandler<UpdateColumnNameApi> = async (d) => {
    try {
      await updateColumn(d.id, d.name);
      await reloadBoard();
      toast.success("column name updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onAddTask: SubmitHandler<AddTaskFormApi> = async (d) => {
    try {
      await addTask(d);
      await reloadBoard();
      toast.success("task added");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onDeleteTask = async (taksId: string) => {
    try {
      await deleteTask(taksId);
      await reloadBoard();
      toast.success("task deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onUpdateTaskName: SubmitHandler<UpdateTaskFormApi> = async (d) => {
    try {
      await updateTask(d.id, d.name);
      await reloadBoard();
      toast.success("task name updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return {
    board,
    onUpdate,
    id,
    onAddColumn,
    onDeleteColumn,
    updateColumnName,
    onAddTask,
    onDeleteTask,
    onUpdateTaskName,
  };
};
export default useBoard;
