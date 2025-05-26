import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/authContext";
const ProtectedRouters = () => {
    const { isAuthenticated,loading } = UseAuth();
    if(loading){
      return <h1 className="text-4xl text-white">Loading...</h1>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>;
  };
  
export default ProtectedRouters;