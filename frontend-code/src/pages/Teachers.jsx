import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Teachers = () => {
  const [teacherdata, setteacherdata] = useState([])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APIURL}/api/teacherdata`)
        setteacherdata(res.data)
      } catch (err) {
        console.error('Error fetching teacher data:', err)
      }
    }
    fetchTeachers()
  }, [])

  // ✅ Delete Teacher
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return

    try {
      await axios.delete(`${import.meta.env.VITE_APIURL}/api/teacherdelete/${id}`)

      // Update state instantly
      setteacherdata((prev) => prev.filter((teacher) => teacher._id !== id))
    } catch (err) {
      console.error('Error deleting teacher:', err)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        {/* Table Head */}
        <thead className="bg-[#02722b] text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Full Name</th>
            <th className="px-4 py-2 border border-gray-300">Subject</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Phone</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {teacherdata.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
            >
              <td className="px-4 py-2 border border-gray-300">{item.fullname}</td>
              <td className="px-4 py-2 border border-gray-300">{item.subject}</td>
              <td className="px-4 py-2 border border-gray-300">{item.email}</td>
              <td className="px-4 py-2 border border-gray-300">{item.phone}</td>
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
  )
}

export default Teachers
