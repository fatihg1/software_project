import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrainManagement = () => {
  const navigate = useNavigate();
  const [trains, setTrains] = useState([
    { id: 1, name: "İstanbul - Ankara", capacity: 300 },
    { id: 2, name: "İzmir - İstanbul", capacity: 250 },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" onClick={() => navigate("/admin/trains")}>
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

      {/* Ana İçerik */}
      <div className="flex-1 p-6 relative">
        {/* Üst Kısım */}
        <div className="flex justify-between items-center mb-6">
          {/* Arama Kutusu */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-96">
            <FaSearch className="text-gray-400 mx-2" />
            <input type="text" placeholder="Ara..." className="outline-none p-1 w-full" />
          </div>

          {/* Sayfa Başlığı */}
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">🚆 Train Management</h1>

          {/* Çıkış Butonu */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Çıkış</span>
          </button>
        </div>

        {/* İçerik */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Train Name</th>
                <th className="p-3 text-left">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train) => (
                <tr key={train.id} className="border-t">
                  <td className="p-3">{train.name}</td>
                  <td className="p-3">{train.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainManagement;
