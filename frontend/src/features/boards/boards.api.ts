import axios from "../../lib/axios";
import type {CreateBoardApi} from "./boards.types";

export const getBoards = async () =>{
    return axios.get("boards");
}

export const createBoard = async (board:CreateBoardApi) =>{
    return axios.post("boards",board);
}

export const deleteBoard = async (id:string) =>{
    return axios.delete(`boards/${id}`);
}