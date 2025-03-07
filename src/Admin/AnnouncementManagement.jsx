import React, { useState } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AnnouncementManagement = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "System Maintenance", content: "System maintenance will be carried out on March 10, 2024." },
    { id: 2, title: "New Routes", content: "New trains have been added to the Istanbul - Ankara route!" },
    { id: 3, title: "Holiday Discount", content: "Special discounts for the holiday season are now available!" },
    { id: 4, title: "COVID-19 Measures", content: "Updated safety measures for all passengers." },
    { id: 5, title: "Schedule Update", content: "Train schedules have been updated for summer 2024." },
    { id: 6, title: "New VIP Lounges", content: "VIP lounges are now available at select stations!" },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);
  const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to add or edit an announcement
  const saveAnnouncement = () => {
    if (title.trim() === "" || content.trim() === "") return;

    if (editingId) {
      // Edit existing announcement
      setAnnouncements(announcements.map((announcement) =>
        announcement.id === editingId ? { id: editingId, title, content } : announcement
      ));
      setEditingId(null);
    } else {
      // Add new announcement
      const newAnnouncement = { id: announcements.length + 1, title, content };
      setAnnouncements([...announcements, newAnnouncement]);
    }
    
    setTitle("");
    setContent("");
  };

  // Delete Confirmation Dialog
  const deleteAnnouncement = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
    if (confirmDelete) {
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
    }
  };

  // Edit Announcement
  const editAnnouncement = (announcement) => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setEditingId(announcement.id);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 📢 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col fixed h-screen">
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
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaBullhorn /> <span>Announcements</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6 ml-64 overflow-auto">
        
        {/* 📢 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📢 Announcement Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* 📢 Add/Edit Announcement Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">{editingId ? "Edit Announcement" : "Add a New Announcement"}</h2>
          <input type="text" placeholder="Title" className="p-2 border rounded-md w-full mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Content" className="p-2 border rounded-md w-full mb-2" value={content} onChange={(e) => setContent(e.target.value)} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={saveAnnouncement}>
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* 📢 Announcement List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Announcements</h2>

          {/* 🔍 Search Bar */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center space-x-4 mb-4">
            <FaSearch className="text-gray-500" />
            <input type="text" placeholder="Search announcements..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {/* Announcement List */}
          <ul>
            {currentAnnouncements.map((announcement) => (
              <li key={announcement.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p>{announcement.content}</p>
                </div>
                <div className="space-x-2">
                  <button title="Edit" className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={() => editAnnouncement(announcement)}><FaEdit /></button>
                  <button title="Delete" className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => deleteAnnouncement(announcement.id)}><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagement;
