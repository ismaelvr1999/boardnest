import axios from "../../lib/axios";
import type {
  AddColumnApi,
  AddTaskFormApi,
  GetBoardResp,
  UpdateBoardApi,
} from "./board.types";

export const getBoard = async (id: string) => {
  const resp = await axios.get<GetBoardResp>(`boards/${id}`);
  return resp.data.board;
};

export const updateBoard = async (id: string, data: UpdateBoardApi) => {
  const resp = await axios.put<{ ok: boolean }>(`boards/${id}`, data);
  return resp.data.ok;
};

export const addColumn = async (data: AddColumnApi) => {
  const resp = await axios.post<{ ok: boolean }>(`columns/`, data);
  return resp.data.ok;
};

export const deleteColumn = async (id: string) => {
  const resp = await axios.delete<{ ok: boolean }>(`columns/${id}`);
  return resp.data.ok;
};

export const updateColumn = async (id: string, name: string) => {
  const resp = await axios.patch<{ ok: boolean }>(`columns/${id}/name`, {
    name,
  });
  return resp.data.ok;
};

export const addTask = async (task: AddTaskFormApi) => {
  await axios.post(`tasks/`, task);
};

export const deleteTask = async (id: string) => {
  const resp = await axios.delete<{ ok: boolean }>(`tasks/${id}`);
  return resp.data.ok;
};

export const updateTask = async (id: string, name: string) => {
  const resp = await axios.patch<{ ok: boolean }>(`tasks/${id}/name`, { name });
  return resp.data.ok;
};

export const updateColumnPosition = async (
  columnId: string,
  newPosition: number
) => {
  const resp = await axios.patch<{ ok: boolean }>(
    `columns/${columnId}/position`,
    { position: newPosition }
  );
  return resp.data.ok;
};

export const updateTaskPosition = async (
  taskId: string,
  newPosition: number,
  newColumnId: string
) => {
  const resp = await axios.patch<{ ok: boolean }>(
    `tasks/${taskId}/position`,
    { newPosition,
      newColumnId}
  );
  return resp.data.ok;
};
