import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APIURL}/api/login`, {
        email,
        password,
      });

      // Save token in localStorage (for protected routes)
      toast.success("Login successful!");
   localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));
      // Redirect to admin after login
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#00A63E] px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#015520] mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e]  outline-none"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e]  outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[#00A63E] text-white py-2 rounded-lg font-semibold hover:bg-[#008631] transition duration-200"
            >
              Login
            </button>
            <div>
              <p className="text-slate-500">ypu dont have an account ? <Link to={'/signup'} className="font-bold text-green-700">Sign Up</Link> </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Login;
