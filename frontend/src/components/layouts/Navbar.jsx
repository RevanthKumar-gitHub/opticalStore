import React from "react";
import {
  MdClose,
  MdDarkMode,
  MdLightMode,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode, toggleMenu } from "../../store/slices/themeSlice";
import { useLocation } from "react-router-dom";
import axios from "../../config/axios";
import { logout, setIsAuthenctiated } from "../../store/slices/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useLocation().pathname;
  const { mode, menu } = useSelector((state) => state.theme);
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/users/logout");
      if (data.success) {
        toast.success(data.message);
        dispatch(setIsAuthenctiated(false));
        dispatch(logout());
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <nav
      className={`${
        isLogin === "/login" ? "hidden" : "flex"
      } shadow-md dark:bg-darkGray  flex-col md:flex-row items-between justify-center md:justify-between px-4 py-6 gap-4 dark:text-white sticky top-0 z-20 w-full bg-white h-[16vh] md:h-[10vh]`}
    >
      <div className="flex justify-between items-center gap-8 px-4 ">
        <div className="text-xl md:text-2xl font-ubuntu flex items-center gap-1 ">
          <div className="flex items-center">
            <span className="text-3xl md:text-4xl text-primary-300">M</span>
            <span>ahesh</span>
          </div>
          <div className="flex items-center">
            <span className="text-3xl md:text-4xl text-primary-300">O</span>
            <span>pticals</span>
          </div>
        </div>
        <button
          className="text-2xl md:text-3xl "
          onClick={() => dispatch(toggleMenu())}
        >
          {menu ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      <div className="flex items-center justify-between md:justify-end px-4 gap-4 ">
        <button
          className="text-xl md:text-2xl dark:text-gray-300 "
          onClick={handleLogout}
        >
          <MdLogout />
        </button>
        <button onClick={() => dispatch(toggleMode())} className="nav-buttons">
          {mode === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
