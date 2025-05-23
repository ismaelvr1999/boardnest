import axios from "../../lib/axios";
import type { FormRegisterValues } from "./register.types";
export const signUp = async (data: FormRegisterValues) => {
  return await axios.post("users/register", data);
};
