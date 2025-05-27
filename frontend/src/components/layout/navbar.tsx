import {Link } from "react-router-dom";
import { UseAuth } from "../../features/auth/context/authContext";

function Navbar() {
  const {isAuthenticated,user,logout} = UseAuth();
    return (
        <nav className=" flex items-center">
          
          {!isAuthenticated
            ?<>
            <h1 className="text-3xl font-bold">BoardNest</h1>           
            <div className="ml-auto">
              <button className="py-2 px-5 rounded-lg bg-white text-black cursor-pointer"><Link to="login">Sign In</Link></button>
              <button className="py-2 px-5 rounded-lg border border-white text-white ml-5 cursor-pointer"><Link to="register">Sign Up</Link></button>
            </div>
            </>
            :
            <>
              <div className="h-2/3 w-14 rounded-full border border-white mr-4"></div>
              <p className=" text-xl">{user?user.username:""}</p>
              <button onClick={logout} className=" py-2 px-5 rounded-lg border border-white text-white ml-auto cursor-pointer">Logout</button>
            </>
          }

        </nav>

    );
  }

  export default Navbar;