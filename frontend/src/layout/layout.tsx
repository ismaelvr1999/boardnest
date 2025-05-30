import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navbar";
function Layout() {
  return (
    <>
      <div className="grid grid-rows-[5rem_1fr] h-screen  text-white px-5 lg:px-28 ">
        <Navbar />
        <div className="flex items-center justify-center">
          <Outlet />
        </div>
      </div>
      
    </>
  );
}

export default Layout;
