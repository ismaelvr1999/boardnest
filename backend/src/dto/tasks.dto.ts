
export interface AddTask {
    id?:string;
    name:string;
    ColumnId:string;
    BoardId: string;
    position?:number;
}

export interface UpdateTaskPosition {
    id: string;
    newPosition: number;
    newColumnId:string;
}