import type { Board } from "../boards/boards.types";
import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type {JSX} from "react";

export interface BoardWithColumns extends Board {
  boardColumns: Column[];
}

export interface Column {
  id: string;
  BoardId: string;
  name: string;
  position: number;
  totalTasks: number;
  creationAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface Task {
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

export interface UpdateBoardFormProps {
  onUpdate: SubmitHandler<UpdateBoardApi>;
  handleSubmit: UseFormHandleSubmit<UpdateBoardApi>;
  register: UseFormRegister<UpdateBoardApi>;
}

export interface AddColumnApi {
  name: string;
  BoardId: string;
}

export interface AddColumnFormProps {
  onAddColumn: SubmitHandler<AddColumnApi>;
  handleSubmit: UseFormHandleSubmit<AddColumnApi>;
  register: UseFormRegister<AddColumnApi>;
}

export interface ColumnProps {
  column: Column;
}

export interface UpdateColumnNameApi {
  name: string;
  id: string;
}

export interface UpdateColumnFormProps {
  onUpdate: SubmitHandler<UpdateColumnNameApi>;
  handleSubmit: UseFormHandleSubmit<UpdateColumnNameApi>;
  register: UseFormRegister<UpdateColumnNameApi>;
}

export interface AddTaskFormApi {
  name: string;
  BoardId: string;
  ColumnId: string;
}

export interface AddTaskFormProps {
  onAddTask: SubmitHandler<AddTaskFormApi>;
  handleSubmit: UseFormHandleSubmit<AddTaskFormApi>;
  register: UseFormRegister<AddTaskFormApi>;
}

export interface TaskProps {
  task:Task;
}

export interface UpdateTaskFormApi {
  id: string;
  name: string;
}

export interface UpdateTaskFormProps {
  onUpdate: SubmitHandler<UpdateTaskFormApi>;
  handleSubmit: UseFormHandleSubmit<UpdateTaskFormApi>;
  register: UseFormRegister<UpdateTaskFormApi>;
}
export type BoardContexType = {
  reloadBoard: ()=> Promise<void>;
  board: BoardWithColumns | undefined;
  boardId:string | undefined;
} | null; 


export type BoardProviderType = () => JSX.Element;