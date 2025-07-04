import axios from "../../lib/axios";
import type { FormRegisterValues,FormLoginValues } from "./auth.types";
export const signUp = async (data: FormRegisterValues) => {
  return await axios.post("users/register", data);
};

export const signIn = async (data:FormLoginValues)=>{
    return axios.post("users/login",data);
}

export const logoutUser = async ()=>{
  axios.get("users/logout");
}

export const uploadProfileImage = async (data:FormData)=>{
    return axios.patch("users/profile/picture",data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
}

export const getUserProfile = async ()=>{
    return axios.get("users/profile");
}