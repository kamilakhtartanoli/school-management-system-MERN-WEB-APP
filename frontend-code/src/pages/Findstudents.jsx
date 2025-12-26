import axios from "axios";
import React, { useState } from "react";

const Findstudents = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [studentdata , setstudentdata] = useState([])
  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8000/api/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error("Error searching student:", err);
    }
  };
  const handlePayFee = async (id) => {
  try {
    const res = await axios.put(`http://localhost:8000/api/studentdata/${id}`, {
      feepay: true, // send updated field
    });

    // Update local state instantly (use results instead of studentdata)
    setResults((prev) =>
      prev.map((student) =>
        student._id === id ? { ...student, feepay: true } : student
      )
    );
  } catch (err) {
    console.error("Error updating fee:", err);
  }
};
  return<>
   <div>
    <h1 className="text-[#02722b] font-semibold p-4 text-2xl">Find Students</h1>
   </div>
    <div className="p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by Name, Father Name or Student ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-[#02722b] text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Search Results Table */}
      {results.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-[#02722b] text-white">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Student ID</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Father Name</th>
                <th className="px-4 py-2 border border-gray-300">Class</th>
                <th className="px-4 py-2 border border-gray-300">Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student, index) => (
                <tr
                  key={student._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {student.studentid}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.fathername}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.classname}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {student.feepay ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                      onClick={()=>handlePayFee(student._id)}
                      >
                        Unpaid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        query && <p className="text-gray-500">No students found.</p>
      )}
    </div>
  </>
};

export default Findstudents;
