import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormRegisterValues } from "./register.types";
import { toast } from "react-toastify";
import { signUp } from "./register.api";

export default function useRegister() {
    const { register, handleSubmit } = useForm<FormRegisterValues>();
    const onSubmit: SubmitHandler<FormRegisterValues> = async (d) => {
      try {
        await signUp(d);
        toast.success(`Register successfully`);
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