import React, { useState, useEffect } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaArrowLeft, FaArrowRight, FaTimes, FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AnnouncementManagement = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile screen and handle sidebar accordingly
  useEffect(() => {

    fetch("http://localhost:8080/announcements")
    .then((res) => res.json())
    .then((data) => setAnnouncements(data))
    .catch((err) => console.error("Fetch error:", err));

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
  
    const method = editingId ? "PUT" : "POST";
    const url = editingId 
      ? `http://localhost:8080/announcements/${editingId}` 
      : "http://localhost:8080/announcements";
  
    const payload = { title, content };
    if (editingId) payload.id = editingId;
  
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingId) {
          setAnnouncements((prev) =>
            prev.map((a) => (a.id === editingId ? data : a))
          );
        } else {
          setAnnouncements((prev) => [...prev, data]);
        }
        setTitle("");
        setContent("");
        setEditingId(null);
      });
  };
  

  // Delete Confirmation Dialog
  const deleteAnnouncement = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
  
    fetch(`http://localhost:8080/announcements/${id}`, {
      method: "DELETE",
    }).then(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    });
  };
  

  // Edit Announcement
  const editAnnouncement = (announcement) => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setEditingId(announcement.id);
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
      
      {/* 📢 Sidebar */}
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
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/bookings");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
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
        {/* 📢 Header */}
        <div className="flex justify-around items-center flex-col mb-6 pt-12 md:pt-0">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📢 Announcement Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md mt-5 hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
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

export default AnnouncementManagement;