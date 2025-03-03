import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AnnouncementManagement = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "System Maintenance", content: "System maintenance will be carried out on March 10, 2024." },
    { id: 2, title: "New Routes", content: "New trains have been added to the Istanbul - Ankara route!" },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to add a new announcement
  const addAnnouncement = () => {
    if (title && content) {
      const newAnnouncement = {
        id: announcements.length + 1,
        title,
        content,
      };
      setAnnouncements([...announcements, newAnnouncement]);
      setTitle("");
      setContent("");
    }
  };

  // Function to delete an announcement
  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
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
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/bookings")}>
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" onClick={() => navigate("/admin/announcements")}>
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
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📢 Announcement Management</h1>

          {/* Logout Button */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Add New Announcement Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">Add a New Announcement</h2>
          <input
            type="text"
            placeholder="Announcement Title"
            className="p-2 border rounded-md w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Announcement Content"
            className="p-2 border rounded-md w-full mb-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={addAnnouncement}
          >
            Add
          </button>
        </div>

        {/* Announcement List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Announcements</h2>
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p>{announcement.content}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => deleteAnnouncement(announcement.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagement;
