import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addclass = () => {
  const [classname, setClassname] = useState("");
  const [classteacher, setClassteacher] = useState("");
  const [section, setSection] = useState("");
  const [classroom, setClassroom] = useState("");

  const addclass = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/addclass", {
        classname,
        classteacher,
        section,
        classroom,
      });
      toast.success("Class added successfully!");

      // reset form
      setClassname("");
      setClassteacher("");
      setSection("");
      setClassroom("");
    } catch (error) {
      toast.error("Failed to add class");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A63E]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#015520] mb-6">
          Add Class
        </h2>

        <form onSubmit={addclass} className="space-y-4">
          <input
            type="text"
            placeholder="Class Name"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Class Teacher"
            value={classteacher}
            onChange={(e) => setClassteacher(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#00A63E] text-white py-2 rounded-lg font-semibold hover:bg-[#008631] transition duration-200"
          >
            Add Class
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Addclass;
