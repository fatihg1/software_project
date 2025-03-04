import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaTicketAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const ManagerDashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button 
            className={`flex items-center space-x-2 p-3 rounded-md ${
              activeTab === "dashboard" ? "bg-purple-700" : "hover:bg-purple-700"
            } transition`} 
            onClick={() => setActiveTab("dashboard")}
          >
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/finance")}>
            <FaMoneyBillWave /> <span>Sales & Refunds</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/salary")}>
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/revenue")}>
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">


          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📊 Manager Dashboard</h1>

          {/* Logout Button */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaUsers className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">1,200</h3>
              <p className="text-gray-500">Total Users</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaTicketAlt className="text-green-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">5,420</h3>
              <p className="text-gray-500">Total Reservations</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaMoneyBillWave className="text-yellow-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">₺254,000</h3>
              <p className="text-gray-500">Monthly Revenue</p>
            </div>
          </div>
        </div>

        {/* Recent Activities and New Users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">📌 Recent Reservations</h2>
            <ul>
              <li className="p-2 border-b">Ali Yılmaz - Istanbul - Ankara (March 10, 2024)</li>
              <li className="p-2 border-b">Ayşe Kaya - Izmir - Istanbul (March 12, 2024)</li>
              <li className="p-2 border-b">Mehmet Demir - Ankara - Izmir (March 15, 2024)</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">🆕 New Users</h2>
            <ul>
              <li className="p-2 border-b">Fatma Demir - Joined: March 5, 2024</li>
              <li className="p-2 border-b">Burak Çelik - Joined: March 7, 2024</li>
              <li className="p-2 border-b">Zeynep Arslan - Joined: March 9, 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
