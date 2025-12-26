import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaSearch, FaUserPlus } from "react-icons/fa";
import {Link} from 'react-router'

const Dashboard = () => {
  const [studentcount , setstudentcount] = useState()
  const [teachercount , setteachercount ] = useState()
  const [classcount , setclasscount] = useState()
  // JSON data for cards
  useEffect(()=>{
    const studentcounts = async () =>{
      const res = await axios.get(`${import.meta.env.VITE_APIURL}/api/studentcount`)
      setstudentcount(res.data.count)
    }
    const teachercount = async ()=>{
      const res = await axios.get(`${import.meta.env.VITE_APIURL}/api/teachercount`)
      setteachercount(res.data.count)
    }
    const classcount = async () =>{
      const res = await axios.get(`${import.meta.env.VITE_APIURL}/api/classcount`)
      setclasscount(res.data.count)
    }

    studentcounts()
    teachercount()
    classcount()
  },[])
  const cardsData = [
    {
      title: "Total Students",
      value: studentcount,
      icon: <FaUserGraduate className="text-3xl" />,
      bg: "bg-yellow-400",
      link:'/admin/students'
    },
    {
      title: "Teachers",
      value: teachercount,
      icon: <FaChalkboardTeacher className="text-3xl" />,
      bg: "bg-orange-200",
      link:'/admin/teachers'
    },
    {
      title: "Classes",
      value: classcount,
      icon: <FaBook className="text-3xl" />,
      bg: "bg-pink-200",
      link:'/admin/classes'
    },
    {
      title: "Find Student",
      icon: <FaSearch className="text-3xl" />,
      bg: "bg-orange-300",
      link:'/admin/findstudents'
    },
    {
      title: "Add Student",
      icon: <FaUserPlus className="text-3xl" />,
      bg: "bg-yellow-300",
      link:'/admin/addstudent'
    },
    {
      title: "Add Teacher",
      icon: <FaChalkboardTeacher className="text-3xl" />,
      bg: "bg-pink-300",
      link:'/admin/addteacher'
    },
      {
      title: "Add Class",
      icon: <FaBook className="text-3xl" />,  // reused book icon
      bg: "bg-green-300",
      link: '/admin/addclass'   // <-- new route for Add Class
    },
  ];

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-6 text-[#02722b]">ADMIN</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <Link to={card.link}>
          <div
            key={index}
            className={`${card.bg} text-black p-6 rounded-xl shadow-lg`}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <div className="flex items-center justify-between mt-3">
              {card.icon}
              {card.value && <p className="text-3xl">{card.value}</p>}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;