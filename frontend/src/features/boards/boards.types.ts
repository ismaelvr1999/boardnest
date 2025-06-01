import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
export interface Board {
    id:string;
    totalColumns:number;
    name:string;
    description:string;
    UserId:string;
    updatedAt:string;
    creationAt:string;
}
export interface DeleteBoard {
    id: string;
}
export type CardProps = {
    board:Board,
    handleDelete:(id:string)=>Promise<void>;
}; 

export interface CreateBoardApi{
    name:string;
    description:string;
}

export interface CreateBoardFormProps {
    onCreate: SubmitHandler<CreateBoardApi>;
    handleSubmit: UseFormHandleSubmit<CreateBoardApi>;
    register:UseFormRegister<CreateBoardApi>;
}