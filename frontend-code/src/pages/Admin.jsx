
import React, { useState } from "react";
import { Home, Users, BookOpen, LogOut, User, Menu, X } from "lucide-react";
import { Link, useNavigate, Outlet } from "react-router";

const Admin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const storedAdmin = (() => {
    try {
      const admin = localStorage.getItem("admin");
      return admin ? JSON.parse(admin) : null;
    } catch (e) {
      return null;
    }
  })();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#009b39] text-white flex flex-col shadow-lg transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Close button (only on mobile) */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 p-4 border-b border-[#02722b]">
          <img
            src={storedAdmin?.photo || "https://via.placeholder.com/50"}
            alt="Admin"
            className="w-16 h-16 rounded-full border-2 border-white object-contain bg-gray-200"
          />
          <div>
            <h3 className="font-semibold">{storedAdmin?.name || "Admin"}</h3>
            <p className="text-sm text-gray-300">Administrator</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#02722b]"
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            to="/admin/students"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#02722b]"
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={20} /> Students
          </Link>
          <Link
            to="/admin/teachers"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#02722b]"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={20} /> Teachers
          </Link>
          <Link
            to="/admin/classes"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#02722b]"
            onClick={() => setSidebarOpen(false)}
          >
            <BookOpen size={20} /> Classes
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#02722b]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-[#02722b] transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar (mobile only, fixed) */}
        <div className="md:hidden flex items-center justify-between bg-[#02722b] text-white p-4 shadow fixed top-0 left-0 right-0 z-40">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <div></div>
        </div>

        {/* Page Content (scrollable area) */}
        <div className="flex-1 overflow-y-auto p-6 mt-14 md:mt-0 md:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
