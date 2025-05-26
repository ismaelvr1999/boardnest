import { createContext, useState, useContext,useEffect} from "react";
import Cookies from "js-cookie";
import axios from "../lib/axios";
import type { AuthContexType, AuthProviderType,User} from "../types/auth.types";

const AuthContext = createContext<AuthContexType>(null);

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };


export const AuthProvider:AuthProviderType = ({children})=> {
    const [user,setUser] = useState<User>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(true);
    const logout = () => {
        Cookies.remove("auth");
        setUser(null);
        setIsAuthenticated(false);
      };
      
      useEffect(()=>{

        const verify = async ()=>{
            const result = await axios.get("users/verify");
            setUser(result.data.profile);
            setIsAuthenticated(true);
            setLoading(false);
        }
        verify().catch((error)=>{
            setLoading(false);
            setIsAuthenticated(false);
            console.log(error.message);
        })
      },[]);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            logout,
            setUser,
            setIsAuthenticated,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}