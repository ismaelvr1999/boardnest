import axios from "../../lib/axios";

export const getBoard = async(id:string)=>{
    const resp = await axios.get(`board/${id}`);
    return resp.data.board;
}