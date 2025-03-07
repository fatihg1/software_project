import React, { useState, useEffect } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaSave, FaTimes, FaFilter, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrainManagement = () => {
  const navigate = useNavigate();
  const [trains, setTrains] = useState([
    { id: 1, from: "İstanbul", to: "Ankara", capacity: 300, price: 150 },
    { id: 2, from: "İzmir", to: "İstanbul", capacity: 250, price: 130 },
    { id: 3, from: "Ankara", to: "Eskişehir", capacity: 200, price: 90 },
    { id: 4, from: "Konya", to: "İstanbul", capacity: 350, price: 180 },
    { id: 5, from: "Bursa", to: "Ankara", capacity: 220, price: 110 },
    { id: 6, from: "Antalya", to: "İzmir", capacity: 270, price: 140 },
    { id: 7, from: "Samsun", to: "Trabzon", capacity: 180, price: 100 },
    { id: 8, from: "Gaziantep", to: "Adana", capacity: 260, price: 130 },
    { id: 9, from: "Erzurum", to: "Kars", capacity: 150, price: 80 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [currentPage, setCurrentPage] = useState(1);
  const trainsPerPage = 7; // ✅ Shows 7 trains per page

  // Sidebar state
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

  const filteredTrains = trains.filter((train) =>
    (train.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.to.toLowerCase().includes(searchQuery.toLowerCase())) &&
    train.price <= maxPrice
  );

  // Pagination calculations
  const indexOfLastTrain = currentPage * trainsPerPage;
  const indexOfFirstTrain = indexOfLastTrain - trainsPerPage;
  const currentTrains = filteredTrains.slice(indexOfFirstTrain, indexOfLastTrain);
  const totalPages = Math.ceil(filteredTrains.length / trainsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Delete Confirmation Dialog
  const deleteTrain = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this train?");
    if (confirmDelete) {
      setTrains(trains.filter(train => train.id !== id));
    }
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
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* 🚆 Sidebar */}
      <div 
        className={`w-64 bg-blue-900 text-white p-6 flex flex-col fixed h-screen z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
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
        </nav>
      </div>

      <div 
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* 🚆 Header */}
        <div className="flex justify-around items-center flex-col mb-6 pt-12 md:pt-0">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">🚆 Train Management</h1>
          <button className="bg-red-600 text-white mt-5 px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* 🚆 Add a New Train Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add a New Train</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input type="text" placeholder="From (Departure)" className="p-2 border rounded-md w-full" />
            <input type="text" placeholder="To (Destination)" className="p-2 border rounded-md w-full" />
            <input type="number" placeholder="Capacity" className="p-2 border rounded-md w-full" />
            <input type="number" placeholder="Ticket Price ($)" className="p-2 border rounded-md w-full" />
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center justify-center space-x-2">
              <FaPlus /> <span>Add Train</span>
            </button>
          </div>
        </div>

        {/* 🚆 Train List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Train List</h2>

          {/* 🔍 Search & Filter */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex items-center w-full">
              <FaSearch className="text-gray-500 mx-2" />
              <input 
                type="text" 
                placeholder="Search by departure or destination..." 
                className="p-2 border rounded-md w-full" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <span>Max Price:</span>
              <input
                type="range"
                min="50"
                max="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24"
              />
              <span>${maxPrice}</span>
            </div>
          </div>

          {/* 📋 Train List Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">To</th>
                  <th className="p-3 text-left">Capacity</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTrains.map((train) => (
                  <tr key={train.id} className="border-t">
                    <td className="p-3">{train.from}</td>
                    <td className="p-3">{train.to}</td>
                    <td className="p-3">{train.capacity}</td>
                    <td className="p-3">${train.price.toFixed(2)}</td>
                    <td className="p-3 flex space-x-2">
                      <button title="Edit Train" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                        <FaEdit />
                      </button>
                      <button title="Delete Train" className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition" onClick={() => deleteTrain(train.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button 
                disabled={currentPage === 1} 
                onClick={prevPage}
                className={`flex items-center space-x-1 p-2 rounded-md ${
                  currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaArrowLeft /> <span>Prev</span>
              </button>
              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
              <button 
                disabled={currentPage === totalPages} 
                onClick={nextPage}
                className={`flex items-center space-x-1 p-2 rounded-md ${
                  currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <span>Next</span> <FaArrowRight />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TrainManagement;