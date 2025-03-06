import React, { useState } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import { FaSignOutAlt, FaMoneyBillWave, FaBars , FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const RevenueAnalysis = () => {
  const navigate = useNavigate();
  
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
    <div className="flex h-screen bg-gray-100">
      
      {/* 💰 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/financial")}> 
            <FaMoneyBillWave /> <span>Financial Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/salary")}>
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" >
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📊 Revenue Analysis</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}> <FaSignOutAlt /> <span>Logout</span> </button>
        </div>
        
        {/* Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-xl font-semibold mb-3">📈 Monthly Revenue</h2> <Bar data={monthlyRevenue} /> </div>
          <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-xl font-semibold mb-3">🏙️ Top 5 Paid Routes</h2> <Pie data={topRoutes} /> </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-xl font-semibold mb-3">📊 Sales Trends</h2> <Line data={salesData} /> </div>
          <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-xl font-semibold mb-3">💰 Revenue vs. Sales</h2> <Scatter data={revenueComparison} /> </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalysis;