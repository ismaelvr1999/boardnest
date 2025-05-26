import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRouters = ()=>{
    const {isAuthenticated} = useAuth();
    const nav = useNavigate()
    if(!isAuthenticated){
        return nav("login");
    }
    return <Outlet/>

}
export default ProtectedRouters;