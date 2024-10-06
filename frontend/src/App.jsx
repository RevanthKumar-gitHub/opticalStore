import React, { useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/miniComponents/Sidebar";
import Products from "./components/pages/Products";
import Login from "./components/pages/Login";
import toast, { Toaster } from "react-hot-toast";
import axios from "./config/axios";
import { login, setIsAuthenctiated } from "./store/slices/userSlice";
import EditFrame from "./components/pages/EditFrame";
import EditLens from "./components/pages/EditLens";
import Orders from "./components/pages/Orders";

const App = () => {
  const { mode } = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/users/profile");
      if (data.success) {
        dispatch(setIsAuthenctiated(true));
        dispatch(login(data.user));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  return (
    <div className={`${mode === "dark" ? "dark" : "light"}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/editFrame/:id" element={<EditFrame />} />
          <Route path="/products/editLens/:id" element={<EditLens />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
