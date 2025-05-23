import { createContext, useState, type Dispatch, type SetStateAction , useContext} from "react";
import Cookies from "js-cookie";
type AuthContextValues = {
    user: UserResp;
    setUser: Dispatch<UserResp>;
    logout: () => void;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    isAuthenticated: boolean;
} | null; 

type UserResp = {
    username:string;
    firstName: string;
    lastName:string;
    email:string;
} | null;

interface AuthProviderProps {
    children: React.ReactNode;
}
const AuthContext = createContext<AuthContextValues>(null);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };


export  function AuthProvider ({children}:AuthProviderProps) {
    const [user,setUser] = useState<UserResp>(
        {
            username:"",
            firstName: "",
            lastName:"",
            email:""
        }
    );
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    const logout = () => {
        Cookies.remove("auth");
        setUser(null);
        setIsAuthenticated(false);
      };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            logout,
            setUser,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}