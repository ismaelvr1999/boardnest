import { createContext, useState, useContext, useEffect } from "react";
import axios from "../../../lib/axios";
import type { AuthContexType, AuthProviderType, User } from "../auth.types";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth.api";
import buildURL from "../../../utils/buildURL";
const AuthContext = createContext<AuthContexType>(null);

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};


export const AuthProvider: AuthProviderType = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const nav = useNavigate();
    const logout = async () => {
        await logoutUser();
        setUser(null);
        setIsAuthenticated(false);
        nav("/");
    };

    useEffect(() => {
        const verify = async () => {
            const result = await axios.get("users/verify");
            setUser({
                ...result.data.profile,
                picture: result.data.profile.picture ?
                    buildURL(result.data.profile.picture) :
                    buildURL("profile-pictures/default.png")
            });
            setIsAuthenticated(true);
            setLoading(false);
        }
        verify().catch((_) => {
            setLoading(false);
            setIsAuthenticated(false);
        })
    }, []);

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