import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "./login.api";
import type { FormLoginValues } from "./login.types";
function useLogin(){
    const { register, handleSubmit } = useForm<FormLoginValues>();
    const onSubmit: SubmitHandler<FormLoginValues> = async (d) => {
      try {
        await signIn(d);
        toast.success(`Login successfully`);
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