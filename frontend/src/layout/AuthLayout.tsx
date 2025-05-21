import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
function AuthLayout() {
  return (
    <>
      <div className="grid grid-rows-[5rem_1fr] h-screen  text-white px-5 lg:px-28 ">
        <Navbar />
        <div className="flex items-center justify-center bg-[#1E1E1E]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
