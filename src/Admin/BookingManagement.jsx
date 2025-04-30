import React, { useState, useEffect } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaTimesCircle, FaTimes, FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);


  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile screen and handle sidebar accordingly
  useEffect(() => {

    fetch("http://localhost:8080/bookings")
    .then((res) => res.json())
    .then((data) => setBookings(data))
    .catch((err) => console.error("Error fetching bookings:", err));

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

  const filteredBookings = bookings.filter((booking) =>
    ((booking.user && booking.user.toLowerCase().includes(searchQuery.toLowerCase())) ||
     (booking.train && booking.train.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (statusFilter === "All" || booking.status === statusFilter)
  );
  

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Change Booking Status
const changeStatus = (id, newStatus) => {
  const bookingToUpdate = bookings.find((b) => b.id === id);
  if (!bookingToUpdate) return;

  const updatedBooking = { ...bookingToUpdate, status: newStatus };

  fetch(`http://localhost:8080/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBooking),
  })
    .then((res) => res.json())
    .then((data) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? data : b))
      );
    })
    .catch((err) => console.error("Update failed:", err));
};


  // Delete Confirmation Dialog
  const deleteBooking = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;
  
    fetch(`http://localhost:8080/bookings/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
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
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/trains");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaTrain /> <span>Train Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
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

      <div 
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* 🚆 Header */}
        <div className="flex justify-around items-center flex-col mb-6 pt-12 md:pt-0">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📅 Booking Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md mt-5 hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* 🔹 Search & Filter */}
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
          <div className="flex items-center w-full mb-4 md:mb-0">
            <FaSearch className="text-gray-500 mx-2" />
            <input 
              type="text" 
              placeholder="Search by user or train..." 
              className="p-2 border rounded-md w-full" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <select 
            className="p-2 border rounded-md w-full md:w-auto md:ml-4" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        {/* 📋 Booking List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Train</th>
                  <th className="p-3 text-left">Date</th>
                  {/*<th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>*/}
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="p-3">{booking.user}</td>
                    <td className="p-3">{booking.train}</td>
                    <td className="p-3">{booking.date}</td>
                    {/*<td className={`p-3 font-bold ${
                      booking.status === "Confirmed" ? "text-green-500" : 
                      booking.status === "Canceled" ? "text-red-500" : 
                      "text-yellow-500"
                    }`}>
                      {booking.status}
                    </td>
                    <td className="p-3">
                      <button title="Confirm" className="bg-green-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => changeStatus(booking.id, "Confirmed")}>
                        <FaCheckCircle />
                      </button>
                      <button title="Pending" className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => changeStatus(booking.id, "Pending")}>
                        <FaClock />
                      </button>
                      <button title="Cancel" className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => deleteBooking(booking.id)}>
                        <FaTimesCircle />
                      </button>
                    </td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                <FaArrowLeft />
              </button>
              <span className="p-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;