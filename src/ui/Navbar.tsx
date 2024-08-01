import { NavLink } from "react-router-dom";
import Button from "./Button";
import toast from "react-hot-toast";

const Navbar = () => {
  const handelLogout = () => {
    localStorage.removeItem("userData");
    toast.success("Logged out successfully", { duration: 1000 });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md bg-blue-600">
      <ul className="flex justify-between items-center">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        <div className="flex items-center space-x-3">
          {userData?.jwt ? (
            <>
              <div className=" bg-white p-[4px] rounded-md border-blue-800 font-semibold ">
                Welcome, {userData.user.username}
              </div>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/todos">Todos</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <Button onClick={handelLogout}>Logout</Button>
              </li>
            </>
          ) : (
            <>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/register">Register</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
