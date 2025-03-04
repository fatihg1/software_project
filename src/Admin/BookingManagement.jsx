import React, { useState } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([
    { id: 1, user: "Ali Yılmaz", train: "Istanbul - Ankara", date: "2024-03-10", status: "Confirmed" },
    { id: 2, user: "Ayşe Kaya", train: "Izmir - Istanbul", date: "2024-03-12", status: "Pending" },
    { id: 3, user: "Mehmet Demir", train: "Ankara - Izmir", date: "2024-03-15", status: "Canceled" },
    { id: 4, user: "Fatma Aydın", train: "Konya - Istanbul", date: "2024-03-18", status: "Pending" },
    { id: 5, user: "Burak Can", train: "Antalya - Izmir", date: "2024-03-20", status: "Confirmed" },
    { id: 6, user: "Emre Güler", train: "Bursa - Ankara", date: "2024-03-22", status: "Canceled" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const filteredBookings = bookings.filter((booking) =>
    (booking.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
     booking.train.toLowerCase().includes(searchQuery.toLowerCase())) &&
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
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  // Delete Confirmation Dialog
  const deleteBooking = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (confirmDelete) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 🚆 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/trains")}>
            <FaTrain /> <span>Train Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/announcements")}>
            <FaBullhorn /> <span>Announcements</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6">
        
        {/* 🚆 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📅 Booking Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* 🔹 Search & Filter */}
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
          <FaSearch className="text-gray-500 mx-2" />
          <input type="text" placeholder="Search by user or train..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="p-2 border rounded-md ml-4" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        {/* 📋 Booking List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Bookings</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Train</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-3">{booking.user}</td>
                  <td className="p-3">{booking.train}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className={`p-3 font-bold ${
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default BookingManagement;
