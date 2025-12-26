import axios from "axios";
import React, { useEffect, useState } from "react";

const Students = () => {
  const [studentdata, setstudentdata] = useState([]);

  useEffect(() => {
    const studentalldata = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APIURL}/api/studentdata`);
      setstudentdata(res.data);
    };
    studentalldata();
  }, []);

  // ✅ Pay Fee
  const handlePayFee = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_APIURL}/api/studentdata/${id}`, {
        feepay: true,
      });

      setstudentdata((prev) =>
        prev.map((student) =>
          student._id === id ? { ...student, feepay: true } : student
        )
      );
    } catch (err) {
      console.error("Error updating fee:", err);
    }
  };

  // ✅ Delete Student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_APIURL}/api/studentdata/${id}`);

      // Remove student from local state
      setstudentdata((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        {/* Table Head */}
        <thead className="bg-[#02722b] text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Student ID</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Father Name</th>
            <th className="px-4 py-2 border border-gray-300">Class</th>
            <th className="px-4 py-2 border border-gray-300">Fee Status</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {studentdata.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="px-4 py-2 border border-gray-300">
                {item.studentid}
              </td>
              <td className="px-4 py-2 border border-gray-300">{item.name}</td>
              <td className="px-4 py-2 border border-gray-300">
                {item.fathername}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.classname}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.feepay ? (
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Paid
                  </button>
                ) : (
                  <button
                    onClick={() => handlePayFee(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Unpaid
                  </button>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleDelete(item._id)}
                  className='bg-red-600 text-white px-2 py-1 rounded-sm cursor-pointer'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
