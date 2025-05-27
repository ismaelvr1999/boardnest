import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className=" flex items-center">
          <h1 className="text-3xl font-bold">BoardNest</h1> 
          <NavLink to="login" className="ml-auto" end>
            <button className="py-2 px-5 rounded-lg bg-white text-black cursor-pointer">Sign In</button>
          </NavLink>
          <NavLink to="register" >
            <button className="py-2 px-5 rounded-lg border border-white text-white ml-5 cursor-pointer">Sign Up</button>
          </NavLink>
        </nav>

    );
  }

  export default Navbar;