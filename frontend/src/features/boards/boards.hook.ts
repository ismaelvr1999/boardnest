import { deleteBoard, getBoards,createBoard,searchBoards } from "./boards.api";
import {  useEffect, useState} from "react";
import type { Board,CreateBoardApi } from "./boards.types";
import { toast } from "react-toastify";
import { useForm,type SubmitHandler } from "react-hook-form";

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>();
  const {handleSubmit,register} = useForm<CreateBoardApi>();
  const [search,setSearch] = useState<string>('');
  const [debouncedInput,setDebouncedInput] = useState<string>(search);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedInput(search);
    },300);
    return () => clearTimeout(handler);
  },[search]);

  useEffect(()=>{
    const fetchBoards = async ()=>{
      try{
        if(debouncedInput === ''){
          const boards = await getBoards();
          setBoards(boards.data.boards);
          return ; 
        }
        const resultBoards = await searchBoards(search);
        setBoards(resultBoards.data.boards);
      }catch(error){
        toast.error((error as Error).message)
      }
    };
    fetchBoards();
  },[debouncedInput]);

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
  
  return { boards,handleDelete,handleSubmit,register,onCreate,search,setSearch};
};
