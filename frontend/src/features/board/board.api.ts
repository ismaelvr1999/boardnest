import axios from "../../lib/axios";
import type { GetBoardResp, UpdateBoardApi } from "./board.types";

export const getBoard = async(id:string)=>{
    const resp = await axios.get<GetBoardResp>(`boards/${id}`);
    return resp.data.board;
}

export const updateBoard = async(id:string,data:UpdateBoardApi)=>{
    const resp = await axios.put<{ok:boolean}>(`boards/${id}`,data);
    return resp.data.ok;
}