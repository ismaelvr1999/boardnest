import type { Board } from "../boards/boards.types";
import type {JSX} from "react";

export interface BoardWithColumns extends Board {
  boardColumns: IColumn[];
}

export interface IColumn {
  id: string;
  BoardId: string;
  name: string;
  position: number;
  totalTasks: number;
  creationAt: string;
  updatedAt: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  ColumnId: string;
  BoardId: string;
  name: string;
  position: number;
  creationAt: string;
  updatedAt: string;
}

export interface GetBoardResp {
  ok: boolean;
  board: BoardWithColumns;
}
export interface UpdateBoardApi {
  name: string;
  description: string;
}

export interface AddColumnApi {
  name: string;
  BoardId: string;
}

export interface UpdateColumnNameApi {
  name: string;
  id: string;
}

export interface AddTaskFormApi {
  name: string;
  BoardId: string;
  ColumnId: string;
}

export interface UpdateTaskFormApi {
  id: string;
  name: string;
}

export type BoardContexType = {
  reloadBoard: ()=> Promise<void>;
  board: BoardWithColumns | undefined;
  boardId:string | undefined;
  setBoard: React.Dispatch<React.SetStateAction<BoardWithColumns | undefined>>;
} | null; 


export type BoardProviderType = () => JSX.Element;