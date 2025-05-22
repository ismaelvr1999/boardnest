import type { FormLoginValues } from "./login.types"
import axios from "../../lib/axios"
export const signIn = async (data:FormLoginValues)=>{
    return axios.post("users/login",data);
}