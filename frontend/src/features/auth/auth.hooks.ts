import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn,signUp } from "./auth.api";
import type { FormLoginValues,FormRegisterValues } from "./auth.types";
import { UseAuth } from "./context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const  useLogin = ()=> {
    const {setIsAuthenticated,setUser,isAuthenticated} = UseAuth();
    const { register, handleSubmit } = useForm<FormLoginValues>();
    const nav = useNavigate();
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

    useEffect(()=>{
      if(isAuthenticated){
        nav("/boards",{
          replace:true
        });
      }
    },[isAuthenticated]);

    return {
        register,
        handleSubmit,
        onSubmit
    }
}

export const useRegister= ()=> {
    const {isAuthenticated} = UseAuth();
    const { register, handleSubmit } = useForm<FormRegisterValues>();
    const nav = useNavigate();
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
    useEffect(()=>{
        if(isAuthenticated){
          nav("/boards",{
            replace:true
          });
        }
      },[isAuthenticated]);

    return {
        register,
        handleSubmit,
        onSubmit
    }
}