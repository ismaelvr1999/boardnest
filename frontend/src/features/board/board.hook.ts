import { useEffect, useState } from "react";
import { getBoard, updateBoard } from "./board.api";
import { toast } from "react-toastify";
import type { BoardWithColumns } from "./board.types";
import { useParams } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { UpdateBoardApi } from "./board.types";
const useBoard = () =>{
    const { id } = useParams<string>();
    const [board, setBoard] = useState<BoardWithColumns>();
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

    const onUpdate: SubmitHandler<UpdateBoardApi> = async (d)=> {
        try{
            if(typeof id === "undefined") return ;
            await updateBoard(id,d);
            const data = await getBoard(id);
            setBoard(data);
            toast.success("board updated");
        } catch(error) {
            console.log((error as Error).message);
        }
    }
    return {board,onUpdate};
}
export default useBoard;