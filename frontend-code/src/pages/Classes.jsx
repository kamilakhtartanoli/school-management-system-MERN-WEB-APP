import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Classes = () => {
  const [classdata, setclassdata] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/classdata')
        setclassdata(res.data)
      } catch (err) {
        console.error('Error fetching class data:', err)
      }
    }
    fetchClasses()
  }, [])
  

  const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this teacher?')) return
  
      try {
        await axios.delete(`http://localhost:8000/api/classdelete/${id}`)
  
        // Update state instantly
        setclassdata((prev) => prev.filter((teacher) => teacher._id !== id))
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
            <th className="px-4 py-2 border border-gray-300">Class Name</th>
            <th className="px-4 py-2 border border-gray-300">Class Teacher</th>
            <th className="px-4 py-2 border border-gray-300">Section</th>
            <th className="px-4 py-2 border border-gray-300">Classroom</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {classdata.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
            >
              <td className="px-4 py-2 border border-gray-300">{item.classname}</td>
              <td className="px-4 py-2 border border-gray-300">{item.classteacher}</td>
              <td className="px-4 py-2 border border-gray-300">{item.section}</td>
              <td className="px-4 py-2 border border-gray-300">{item.classroom}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className='bg-red-600 text-white px-2 py-1 rounded-sm cursor-pointer'
                onClick={()=>handleDelete(item._id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Classes
