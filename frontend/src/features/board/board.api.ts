import axios from "../../lib/axios";
import type { AddColumnApi, GetBoardResp, UpdateBoardApi } from "./board.types";

export const getBoard = async(id:string)=>{
    const resp = await axios.get<GetBoardResp>(`boards/${id}`);
    return resp.data.board;
}

export const updateBoard = async(id:string,data:UpdateBoardApi)=>{
    const resp = await axios.put<{ok:boolean}>(`boards/${id}`,data);
    return resp.data.ok;
}

export const addColumn = async(data:AddColumnApi)=>{
    const resp = await axios.post<{ok:boolean}>(`columns/`,data);
    return resp.data.ok;
}