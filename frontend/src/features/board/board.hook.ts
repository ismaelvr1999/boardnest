import { useEffect, useState } from "react";
import { addColumn, deleteColumn, getBoard, updateBoard, updateColumn } from "./board.api";
import { toast } from "react-toastify";
import type { AddColumnApi, BoardWithColumns, UpdateColumnNameApi } from "./board.types";
import { useParams } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { UpdateBoardApi } from "./board.types";
const useBoard = () => {
  const { id } = useParams<string>();
  const [board, setBoard] = useState<BoardWithColumns>();
  
  const reloadBoard = async ()=>{
    if (typeof id === "undefined") return;
    const data = await getBoard(id);
    setBoard(data);
  }

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

  const onDeleteColumn = async (columnId:string)=>{
    try{
      await deleteColumn(columnId);
      await reloadBoard();
      toast.success("Column deleted");
    }catch(error) {
      toast.error((error as Error).message);
    }
  }

  const updateColumnName:SubmitHandler<UpdateColumnNameApi> = async (d) =>{
    try{
      await updateColumn(d.id,d.name);
      await reloadBoard();
      toast.success("column name updated");
    }catch (error) {
      toast.error((error as Error).message)
    }
  }
  return { board, onUpdate, id, onAddColumn, onDeleteColumn, updateColumnName };
};
export default useBoard;
