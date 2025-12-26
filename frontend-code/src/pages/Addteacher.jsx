import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addteacher = () => {
  const [fullname, setFullname] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addteacher = async (e) => {
    e.preventDefault(); // ✅ correct spelling
    try {
      await axios.post("http://localhost:8000/api/addteacher", {
        fullname,
        subject,
        email,
        phone,
      });
      toast.success("Teacher added successfully!");

      // Reset form after submit
      setFullname("");
      setSubject("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast.error("Failed to add teacher");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A63E] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#015520] mb-6">
          Add Teacher
        </h2>

        <form onSubmit={addteacher} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#00A63E] text-white py-2 rounded-lg font-semibold hover:bg-[#008631] transition duration-200"
          >
            Add Teacher
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Addteacher;
