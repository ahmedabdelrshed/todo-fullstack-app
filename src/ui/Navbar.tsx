import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md bg-blue-500">
      <ul className="flex justify-between items-center">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        <p className="flex items-center space-x-3">
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
          </li>
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;
