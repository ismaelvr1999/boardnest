import { Link, NavLink } from "react-router-dom";
import { UseAuth } from "../../features/auth/context/authContext";
import useModal from "../../hooks/modal.hook";
import Modal from "../modal";
import ProfileModal from "./profileModal";

function Navbar() {
  const { isAuthenticated, user, logout } = UseAuth();
  const { isHidden, handleClose, handleOpen } = useModal();
  return (
    <nav className=" flex items-center">
      {!isAuthenticated ? (
        <>
          <h1 className="text-3xl font-bold">BoardNest</h1>
          <div className="ml-auto">
            <Link to="login">
              <button className="py-2 px-5 rounded-lg bg-white text-black cursor-pointer hover:shadow-white hover:shadow-xl/10 hover:scale-105 transform transition-transform duration-200 ease-in-out">
                Sign In
              </button>
            </Link>
            <Link to="register">
              <button className="py-2 px-5 rounded-lg border border-white text-white ml-5 cursor-pointer hover:shadow-white hover:shadow-xl/10 hover:scale-105 transform transition-transform duration-200 ease-in-out">
                Sign Up
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {user && <img src={user.picture} alt="profile-picture" onClick={handleOpen} className="h-2/3 w-14 rounded-full border-2 cursor-pointer border-white mr-4" />}
          <p className=" text-xl mr-4">{user ? user.username : ""}</p>
          <button
            onClick={logout}
            className=" py-2 px-5 rounded-lg border border-white text-white cursor-pointer hover:bg-white hover:text-black hover:scale-105 transform transition-transform duration-200 ease-in-out"
          >
            Logout
          </button>

          <NavLink
            to="/boards"
            className='ml-auto h-full flex items-center hover:border-b-2'
          >
            <p className="text-xl">My boards</p>
          </NavLink>
          <Modal isHidden={isHidden} handleClose={handleClose}>
            <ProfileModal user={user}></ProfileModal>
          </Modal>
        </>
      )}

    </nav>
  );
}

export default Navbar;
