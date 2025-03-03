import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaTrain, FaClipboardList, FaBullhorn, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const AdminDashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

//   // Kullanıcı giriş yapmamışsa veya admin değilse yönlendir
//   if (!isSignedIn || user.publicMetadata?.role !== "admin") {
//     return <Navigate to="/" />;
//   }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className={`flex items-center space-x-2 p-3 rounded-md ${activeTab === "dashboard" ? "bg-purple-700" : "hover:bg-purple-700"} transition`} onClick={() => setActiveTab("dashboard")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/trains")}> 
            <FaTrain /> <span>Train Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/bookings")}> 
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/announcements")}> 
            <FaBullhorn /> <span>Announcements</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📊 Admin Dashboard</h1>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
        
        {/* Dashboard Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Welcome to Admin Panel</h2>
          <p className="text-gray-600">Manage trains, bookings, and announcements easily from here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
