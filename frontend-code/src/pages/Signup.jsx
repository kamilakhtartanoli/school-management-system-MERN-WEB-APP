import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false); // <-- new state
  const navigate = useNavigate();

  // Upload image to Cloudinary when selected
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // preview for user
    setUploading(true); // start uploading

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "student-managment"); // your Cloudinary preset
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/diocbqpbj/image/upload",
        data
      );
      setProfilePic(res.data.secure_url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false); // stop uploading
    }
  };

  // Signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APIURL}/api/signup`, {
        name,
        email,
        password,
        profilepic: profilePic,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      toast.success("Signup successful!");
      navigate("/admin/dashboard"); // redirect
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const admin = JSON.parse(localStorage.getItem("admin"));
  console.log(admin);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#00A63E] px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#015520] mb-6">
            CREATE ACCOUNT
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
            />

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-2 py-2 border rounded-lg text-slate-500"
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover mt-2 mx-auto border"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={uploading} // disable while uploading
              className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00A63E] text-white hover:bg-[#008631]"
              }`}
            >
              {uploading ? "Uploading Image..." : "Sign Up"}
            </button>

            <div>
              <p className="text-slate-500">
                If you have an account ?{" "}
                <Link to="/login" className="text-green-700 font-bold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Signup;
