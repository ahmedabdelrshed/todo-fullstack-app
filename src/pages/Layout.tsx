import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const Layout = () => {
  return (
   <>
    <div>
      <Navbar />
    </div>
    <div className="container">
        <Outlet/>
    </div>
   </>
  );
};

export default Layout;
