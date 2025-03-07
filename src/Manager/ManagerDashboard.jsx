import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaTicketAlt, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

const ManagerDashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Mobile Sidebar Toggle Button - positioned to move with sidebar */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`md:hidden fixed top-4 ${sidebarOpen ? 'left-52' : 'left-4'} z-30 bg-blue-900 text-white p-3 rounded-md shadow-lg transition-all duration-300 ease-in-out`}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay (mobile only) */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 backdrop-blur-xs z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`bg-blue-900 text-white p-6 flex flex-col fixed h-screen z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 md:translate-x-0`}
      >
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
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/users");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaUsers /> <span>User Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/finance");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaMoneyBillWave /> <span>Financial Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/salary");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/revenue");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pt-12 md:pt-0">
          {/* Search Box */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-full md:w-96 mb-4 md:mb-0">
            <FaSearch className="text-gray-400 mx-2" />
            <input type="text" placeholder="Search..." className="outline-none p-1 w-full" />
          </div>

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 text-center md:text-center my-4 md:my-0">
            📊 Manager Dashboard
          </h1>

          {/* Logout Button */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaUsers className="text-blue-500 text-2xl md:text-3xl" />
            <div>
              <h3 className="text-lg md:text-xl font-bold">1,200</h3>
              <p className="text-gray-500 text-sm md:text-base">Total Users</p>
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaTicketAlt className="text-green-500 text-2xl md:text-3xl" />
            <div>
              <h3 className="text-lg md:text-xl font-bold">5,420</h3>
              <p className="text-gray-500 text-sm md:text-base">Total Reservations</p>
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center space-x-4 sm:col-span-2 md:col-span-1">
            <FaMoneyBillWave className="text-yellow-500 text-2xl md:text-3xl" />
            <div>
              <h3 className="text-lg md:text-xl font-bold">₺254,000</h3>
              <p className="text-gray-500 text-sm md:text-base">Monthly Revenue</p>
            </div>
          </div>
        </div>

        {/* Recent Activities and New Users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3">📌 Recent Reservations</h2>
            <ul>
              <li className="p-2 border-b">Ali Yılmaz - Istanbul - Ankara (March 10, 2024)</li>
              <li className="p-2 border-b">Ayşe Kaya - Izmir - Istanbul (March 12, 2024)</li>
              <li className="p-2 border-b">Mehmet Demir - Ankara - Izmir (March 15, 2024)</li>
            </ul>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3">🆕 New Users</h2>
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