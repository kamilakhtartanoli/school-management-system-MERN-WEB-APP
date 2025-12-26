import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addstudent = () => {
  const [studentid, setStudentid] = useState('');
  const [name, setName] = useState('');
  const [fathername, setFathername] = useState('');
  const [classname, setClassname] = useState('');
  const [feepay, setFeepay] = useState(false);

  const addstudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_APIURL}/api/students`, {
        studentid,
        name,
        fathername,
        classname,
        feepay
      });
      toast.success("Student added successfully!");
      // Reset form
      setStudentid('');
      setName('');
      setFathername('');
      setClassname('');
      setFeepay(false);
    } catch (err) {
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A63E] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#015520] mb-6">
          Add Students
        </h2>
        <form onSubmit={addstudent} className="space-y-4">
          <input
            type="text"
            placeholder="Student ID"
            value={studentid}
            onChange={(e) => setStudentid(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Father Name"
            value={fathername}
            onChange={(e) => setFathername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <input
            type="text"
            placeholder="Class Name"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded-lg focus:ring-1 focus:ring-[#00a63e] outline-none"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={feepay}
              onChange={(e) => setFeepay(e.target.checked)}
              className="w-5 h-5 mr-2 accent-[#00a63e]"
            />
            <label className="text-slate-700 font-medium">Fee Paid</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00A63E] text-white py-2 rounded-lg font-semibold hover:bg-[#008631] transition duration-200"
          >
            Add Student
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Addstudent;
