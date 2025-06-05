import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navbar";
function Layout() {
  return (
    <>
      <div className="grid grid-rows-[5rem_1fr] h-screen  text-white px-5 lg:px-28 ">
        <Navbar />
        <div className="h-full w-full flex justify-center items-center overflow-hidden">
          <Outlet />
        </div>
      </div>
      
    </>
  );
}

export default Layout;
