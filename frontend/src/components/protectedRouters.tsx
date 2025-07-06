import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../features/auth/context/authContext";
import Spinner from "./spinner";
const ProtectedRouters = () => {
    const { isAuthenticated,loading } = UseAuth();
    if(loading){
      return <Spinner/>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace/>;
  };
  
export default ProtectedRouters;