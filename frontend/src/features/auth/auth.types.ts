import {  type Dispatch, type SetStateAction, type ReactNode, type JSX} from "react";
export interface FormLoginValues {
    username: string;
    password: string;
  };

  export interface FormRegisterValues {
    firstName:string;
    lastName: string;
    username:string;
    email:string;
    password:string;
 };

 export type AuthContexType = {
    user: User;
    setUser: Dispatch<User>;
    logout: () => void;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    isAuthenticated: boolean;
    loading: boolean;
} | null; 

export type User = {
    username:string;
    firstName: string;
    lastName:string;
    email:string;
} | null;

export type AuthProviderType = ({children}:{children:ReactNode}) => JSX.Element;

