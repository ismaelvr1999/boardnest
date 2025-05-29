export interface Board {
    id?:string;
    totalColumns?:number;
    name:string;
    description:string;
    UserId?:string;
    updatedAt?:string;
    creationAt?:string;
}

export type CardProps = {
    board:Board
}; 