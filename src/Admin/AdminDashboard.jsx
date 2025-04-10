import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaTrain, FaClipboardList, FaBullhorn, FaBars, FaSignOutAlt, FaChartBar, FaTicketAlt, FaMoneyBillWave, FaTimes, FaInbox } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";


const AdminDashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [totalTrains, setTotalTrains] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);


  
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const trainsRes = await axios.get("http://localhost:8080/api/trains");
        const bookingsRes = await axios.get("http://localhost:8080/bookings");
        const announcementsRes = await axios.get("http://localhost:8080/announcements");
        const fetchRevenue = async () => {
          try {
            const res = await axios.get("http://localhost:8080/finance");
            const now = new Date();
            const monthRevenue = res.data
              .filter(d => d.type === "Sale" && new Date(d.date).getMonth() === now.getMonth())
              .reduce((sum, d) => sum + d.amount, 0);
            setMonthlyRevenue(monthRevenue);
          } catch (error) {
            console.error("Revenue fetch error:", error);
          }
        };
        fetchRevenue();
        

        setTotalTrains(trainsRes.data.length);
        setTotalReservations(bookingsRes.data.length);
        setRecentBookings(bookingsRes.data.slice(-3).reverse());
        setAnnouncements(announcementsRes.data.slice(-3).reverse());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    
    fetchDashboardData();
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
            <h3 className="text-xl font-bold">{totalTrains}</h3>
              <p className="text-gray-500">Total Trains</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaTicketAlt className="text-green-500 text-3xl" />
            <div>
            <h3 className="text-xl font-bold">{totalReservations}</h3>
              <p className="text-gray-500">Total Reservations</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaMoneyBillWave className="text-yellow-500 text-3xl" />
            <div>
            <h3 className="text-xl font-bold">₺{monthlyRevenue.toLocaleString("tr-TR")}</h3>
              <p className="text-gray-500">Monthly Revenue</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">📅 Recent Bookings</h2>
            <ul>
              {recentBookings.map((booking, index) => (
                <li key={index} className="p-2 border-b">
                  {booking.user} - {booking.train} ({booking.date})
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">📢 Upcoming Announcements</h2>
            <ul>
              {announcements.map((a, index) => (
                <li key={index} className="p-2 border-b">
                  {a.title} - {a.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;