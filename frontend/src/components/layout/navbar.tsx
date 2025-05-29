import { Link, NavLink } from "react-router-dom";
import { UseAuth } from "../../features/auth/context/authContext";

function Navbar() {
  const { isAuthenticated, user, logout } = UseAuth();
  return (
    <nav className=" flex items-center">
      {!isAuthenticated ? (
        <>
          <h1 className="text-3xl font-bold">BoardNest</h1>
          <div className="ml-auto">
            <Link to="login">
              <button className="py-2 px-5 rounded-lg bg-white text-black cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link to="register">
              <button className="py-2 px-5 rounded-lg border border-white text-white ml-5 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="h-2/3 w-14 rounded-full border border-white mr-4 bg-[url(/user.jpg)] bg-cover bg-center"></div>
          <p className=" text-xl mr-4">{user ? user.username : ""}</p>
          <button
            onClick={logout}
            className=" py-2 px-5 rounded-lg border border-white text-white cursor-pointer"
          >
            Logout
          </button>

          <NavLink
            to="/boards"
            className={({ isActive }) => {
              return `ml-auto h-full flex items-center ${
                isActive ? "border-b-2" : " "
              }`;
            }}
          >
            <p className="text-xl">My boards</p>
          </NavLink>

        </>
      )}
    </nav>
  );
}

export default Navbar;
