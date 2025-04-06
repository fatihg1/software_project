import React, { useState, useEffect } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import { FaSignOutAlt, FaMoneyBillWave, FaBars, FaUsers, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const RevenueAnalysis = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    fetch("http://localhost:8080/revenue")
      .then((res) => res.json())
      .then((data) => setRevenueData(data))
      .catch((err) => console.error("Error fetching revenue data:", err));
  }, []);

  
  // Handle responsive behavior
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
  
  // Monthly Revenue Data
  const monthlyRevenue = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Monthly Revenue ($)",
      data: [12000, 15000, 14000, 18000, 22000, 20000, 21000, 25000, 27000, 30000, 32000, 35000],
      backgroundColor: "#1866bb",
    }],
  };
  
  // Top 5 Most Paid Routes
  const topRoutes = {
    labels: ["Istanbul-Ankara", "Izmir-Istanbul", "Bursa-Ankara", "Antalya-Izmir", "Konya-Istanbul"],
    datasets: [{
      label: "Total Revenue ($)",
      data: [50000, 42000, 39000, 36000, 34000],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
    }],
  };
  
  // Sales Data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Total Sales ($)",
      data: [10000, 13000, 12000, 16000, 20000, 18000, 19000, 22000, 25000, 27000, 30000, 32000],
      borderColor: "#ffcc00",
      backgroundColor: "rgba(255, 204, 0, 0.5)",
      tension: 0.4,
    }],
  };
  
  // Revenue per Passenger vs. Total Sales (Comparison)
  const revenueComparison = {
    datasets: [{
      label: "Revenue per Passenger vs. Total Sales",
      data: [
        { x: 100, y: 10000 }, { x: 130, y: 13000 }, { x: 120, y: 12000 },
        { x: 160, y: 16000 }, { x: 200, y: 20000 }, { x: 180, y: 18000 },
        { x: 190, y: 19000 }, { x: 220, y: 22000 }, { x: 250, y: 25000 },
        { x: 270, y: 27000 }, { x: 300, y: 30000 }, { x: 320, y: 32000 },
      ],
      backgroundColor: "#ff5733",
    }],
  };

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
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager");
              if (isMobile) setSidebarOpen(false);
            }}
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
            className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition"
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pt-12 md:pt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 text-center md:text-center my-4 md:my-0">
            📊 Revenue Analysis
          </h1>
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" 
            onClick={() => navigate("/")}
          > 
            <FaSignOutAlt /> <span>Back</span> 
          </button>
        </div>
        
        {/* Graphs - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">📈 Monthly Revenue</h2> 
            <div className="h-64 md:h-72">
              <Bar data={monthlyRevenue} options={{ maintainAspectRatio: false }} /> 
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">🏙️ Top 5 Paid Routes</h2> 
            <div className="h-64 md:h-72">
              <Pie data={topRoutes} options={{ maintainAspectRatio: false }} /> 
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">📊 Sales Trends</h2> 
            <div className="h-64 md:h-72">
              <Line data={salesData} options={{ maintainAspectRatio: false }} /> 
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">💰 Revenue vs. Sales</h2> 
            <div className="h-64 md:h-72">
              <Scatter data={revenueComparison} options={{ maintainAspectRatio: false }} /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalysis;