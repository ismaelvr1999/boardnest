import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "./login.api";
import type { FormLoginValues } from "./login.types";
import { UseAuth } from "../../contexts/authContext";
function useLogin(){
   const {setIsAuthenticated,setUser} = UseAuth();
    const { register, handleSubmit } = useForm<FormLoginValues>();
    const onSubmit: SubmitHandler<FormLoginValues> = async (d) => {
      try {
        const resp = await signIn(d);
        toast.success(`Login successfully`);
        setIsAuthenticated(true);
        setUser(resp.data.profile);
      } catch (error) {
        if(error instanceof Error){
          toast.error(error.message);
        }
      }
    };

    return {
        register,
        handleSubmit,
        onSubmit
    }
}

export default useLogin;