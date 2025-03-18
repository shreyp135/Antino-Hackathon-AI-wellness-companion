import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import React from "react";

function Signin() {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    Navigate("/");
  }
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    toast("Logging in, please wait...");
    setLoading(true);
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await api.post("/auth/signin", { username, password });
      toast.success("Login successful", {
        duration: 5000,
        position: "top-center",
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.user._id);
      Navigate("/");
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Invalid credentials");
      }
      if (err.response?.status === 500) {
        toast.error("Error logging in");
      }
      console.error("Login was not successful", err);
    }
    setLoading(false);
  };

  return (
    <>
    <div className="h-[90vh] flex flex-col justify-center items-center px-4">
      <div className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Welcome to <span className="text-purple-500">Aluma</span> - Your AI Companion!
      </div>

      <Toaster />

      <div className="w-full max-w-md bg-white border border-gray-300 shadow-lg rounded-xl p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-2xl font-semibold text-gray-800">Login to Aluma</div>
          <div className="text-md text-gray-600">Talk about your day with your AI buddy.</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="email"
              name="email"
              placeholder="abc@example.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 transition duration-200 text-white text-lg font-medium py-2 rounded-md flex justify-center items-center mt-2"
          >
            {loading ? <TailSpin height={25} width={25} color="#ffffff" /> : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-700 mt-4">
          Don't have an account?
          <Link to="/signup" className="text-purple-500 hover:underline ml-1">
            Signup
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signin;
