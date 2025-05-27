import axios from "../../lib/axios";
import type { FormRegisterValues,FormLoginValues } from "./auth.types";
export const signUp = async (data: FormRegisterValues) => {
  return await axios.post("users/register", data);
};

export const signIn = async (data:FormLoginValues)=>{
    return axios.post("users/login",data);
}
