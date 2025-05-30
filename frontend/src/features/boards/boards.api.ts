import axios from "../../lib/axios";
import type { Board } from "./boards.types";

export const getBoards = async () =>{
    return axios.get("boards");
}

export const creadBoard = async (board:Board) =>{
    return axios.post("boards",board);
}

export const deleteBoard = async (id:string) =>{
    return axios.delete(`boards/${id}`);
}