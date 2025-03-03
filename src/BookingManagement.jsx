import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([
    { id: 1, user: "Ali Yılmaz", train: "Istanbul - Ankara", date: "2024-03-10", status: "Confirmed" },
    { id: 2, user: "Ayşe Kaya", train: "Izmir - Istanbul", date: "2024-03-12", status: "Pending" },
    { id: 3, user: "Mehmet Demir", train: "Ankara - Izmir", date: "2024-03-15", status: "Canceled" },
  ]);

  // Function to change booking status
  const changeStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/trains")}>
            <FaTrain /> <span>Train Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" onClick={() => navigate("/admin/bookings")}>
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/announcements")}>
            <FaBullhorn /> <span>Announcements</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Box */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-96">
            <FaSearch className="text-gray-400 mx-2" />
            <input type="text" placeholder="Search..." className="outline-none p-1 w-full" />
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📅 Booking Management</h1>

          {/* Logout Button */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Booking List */}
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
              {bookings.map((booking) => (
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
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => changeStatus(booking.id, "Confirmed")}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => changeStatus(booking.id, "Pending")}
                    >
                      Pending
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => changeStatus(booking.id, "Canceled")}
                    >
                      Cancel
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
