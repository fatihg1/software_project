import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaTrain, FaClipboardList, FaBullhorn, FaBars, FaSignOutAlt, FaChartBar, FaTicketAlt, FaMoneyBillWave, FaTimes, FaInbox } from "react-icons/fa";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile screen and handle sidebar accordingly
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
      {/* Mobile Sidebar Toggle Button */}
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
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`w-64 bg-blue-900 text-white p-6 flex flex-col fixed h-screen z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button 
            className={`flex items-center space-x-2 p-3 rounded-md ${
              activeTab === "dashboard" ? "bg-purple-700" : "hover:bg-purple-700"
            } transition`} 
            onClick={() => {
              setActiveTab("dashboard");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaBars /> <span>Dashboard</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/trains");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaTrain /> <span>Train Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/bookings");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/announcements");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaBullhorn /> <span>Announcements</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/appeals");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaInbox /> <span>Appeal Management</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between flex-col items-center mb-6 pt-12 md:pt-0">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📊 Admin Dashboard</h1>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-5 hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>
          
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaTrain className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">120</h3>
              <p className="text-gray-500">Total Trains</p>
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

        {/* Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">📅 Recent Bookings</h2>
            <ul>
              <li className="p-2 border-b">Ali Yılmaz - Istanbul - Ankara (March 10, 2024)</li>
              <li className="p-2 border-b">Ayşe Kaya - Izmir - Istanbul (March 12, 2024)</li>
              <li className="p-2 border-b">Mehmet Demir - Ankara - Izmir (March 15, 2024)</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">📢 Upcoming Announcements</h2>
            <ul>
              <li className="p-2 border-b">System Maintenance - March 15, 2024</li>
              <li className="p-2 border-b">New Routes Added - March 18, 2024</li>
              <li className="p-2 border-b">Holiday Discount - March 20, 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;