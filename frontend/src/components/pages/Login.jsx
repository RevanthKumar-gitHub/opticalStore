import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setIsAuthenctiated } from "../../store/slices/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", formData);
      if (data.success) {
        toast.success(data.message);
        dispatch(setIsAuthenctiated(true));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="basis-1/2 flex items-center justify-center font-ubuntu text-[10rem] md:text-[12rem] font-semibold ">
        <span className="text-primary-300 text-[12rem] md:text-[16rem]">M</span>
        <span className="rotate-45">O</span>
      </div>
      <div className="basis-1/2  flex flex-col  justify-center gap-4 px-6 border-t-4 md:border-none">
        <div className="flex items-center justify-center font-ubuntu text-xl md:text-2xl font-bold gap-2">
          <div className="flex items-center">
            <span className="text-4xl md:text-6xl text-primary-300">M</span>
            <span>ahesh</span>
          </div>
          <div className="flex items-center">
            <span className="text-4xl md:text-6xl text-primary-300">O</span>
            <span>pticals</span>
          </div>
        </div>
        <form className="flex flex-col font-karla gap-4 ">
          <div className="flex flex-col ">
            <label htmlFor="email" className="text-lg font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="p-4 w-full  rounded-xl text-white bg-darkGray focus:outline outline-primary-300"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="p-4 w-full  rounded-xl text-white bg-darkGray focus:outline outline-primary-300"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-primary-300 p-4 text-xl font-bold rounded-xl"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
