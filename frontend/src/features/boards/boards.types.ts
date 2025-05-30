export interface Board {
    id:string;
    totalColumns?:number;
    name:string;
    description:string;
    UserId?:string;
    updatedAt?:string;
    creationAt?:string;
}
export interface DeleteBoard {
    id: string;
}
export type CardProps = {
    board:Board,
    handleDelete:(id:string)=>Promise<void>;
}; 