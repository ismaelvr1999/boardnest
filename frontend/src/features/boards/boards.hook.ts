import { deleteBoard, getBoards,createBoard } from "./boards.api";
import { useEffect, useState} from "react";
import type { Board,CreateBoardApi } from "./boards.types";
import { toast } from "react-toastify";
import { useForm,type SubmitHandler } from "react-hook-form";

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>();
  const {handleSubmit,register} = useForm<CreateBoardApi>();

  useEffect(() => {
    getBoards()
      .then((resp) => {
        setBoards(resp.data.boards);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleDelete = async (id:string) => {
    try {
      await deleteBoard(id);
      toast.success("board deleted");
      const respBoards = await getBoards();
      setBoards(respBoards.data.boards);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const onCreate: SubmitHandler<CreateBoardApi> = async (d)=>{
    try {
        await createBoard(d);
        toast.success("board created");
        const respBoards = await getBoards();
        setBoards(respBoards.data.boards);
    } catch (error) {
        toast.error(( error as Error).message);
    }
  }

  return { boards,handleDelete,handleSubmit,register,onCreate};
};
