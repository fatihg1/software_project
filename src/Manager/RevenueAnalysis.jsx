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
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [topRoutes, setTopRoutes] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [revenueComparison, setRevenueComparison] = useState(null);
  const [debugMonthly, setDebugMonthly] = useState(null);
const [debugTopRoutes, setDebugTopRoutes] = useState(null);
const [debugSales, setDebugSales] = useState(null);
const [debugScatter, setDebugScatter] = useState(null);


  
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

  useEffect(() => {
    // Monthly Revenue
    fetch("http://localhost:8080/finance/revenue/monthly")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Monthly Revenue:", data);
        setMonthlyRevenue({
          labels: Object.keys(data),
          datasets: [{
            label: "Monthly Revenue ($)",
            data: Object.values(data),
            backgroundColor: "#1866bb"
          }]
        });
      })
      .catch((err) => console.error("❌ Monthly Revenue Fetch Error:", err));
  
    // Top 5 Routes
    fetch("http://localhost:8080/finance/revenue/top-routes")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Top Routes:", data);
        setTopRoutes({
          labels: Object.keys(data),
          datasets: [{
            label: "Total Revenue ($)",
            data: Object.values(data),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"]
          }]
        });
      })
      .catch((err) => console.error("❌ Top Routes Fetch Error:", err));
  
    // Sales Trends
    fetch("http://localhost:8080/finance/revenue/sales-trends")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Sales Trends:", data);
        setSalesData({
          labels: Object.keys(data),
          datasets: [{
            label: "Total Sales ($)",
            data: Object.values(data),
            borderColor: "#ffcc00",
            backgroundColor: "rgba(255, 204, 0, 0.5)",
            tension: 0.4
          }]
        });
      })
      .catch((err) => console.error("❌ Sales Trends Fetch Error:", err));
  
    // Revenue vs Sales Scatter
    fetch("http://localhost:8080/finance/revenue/scatter")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Scatter Revenue Data:", data);
        setRevenueComparison({
          datasets: [{
            label: "Revenue per Passenger vs. Total Sales",
            data: data.map(d => ({ x: d.passengers, y: d.revenue })),
            backgroundColor: "#ff5733"
          }]
        });
      })
      .catch((err) => console.error("❌ Scatter Fetch Error:", err));
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
              <Bar data={monthlyRevenue || { labels: [], datasets: [] }} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">🏙️ Top 5 Paid Routes</h2> 
            <div className="h-64 md:h-72">
              <Pie data={topRoutes || { labels: [], datasets: [] }} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">📊 Sales Trends</h2> 
            <div className="h-64 md:h-72">
              <Line data={salesData || { labels: [], datasets: [] }} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md"> 
            <h2 className="text-lg md:text-xl font-semibold mb-3">💰 Revenue vs. Sales</h2> 
            <div className="h-64 md:h-72">
              <Scatter data={revenueComparison || { datasets: [] }} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default RevenueAnalysis;