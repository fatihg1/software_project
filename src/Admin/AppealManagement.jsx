import React, { useState, useEffect } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaArrowLeft, FaArrowRight, FaTimes, FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AppealManagement = () => {
  const navigate = useNavigate();
  const [appeals, setAppeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appealsPerPage = 5;

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/appeals")
      .then((res) => res.json())
      .then((data) => setAppeals(data))
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredAppeals = appeals.filter((appeal) =>
    appeal.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appeal.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  const deleteAppeal = (id) => {
    if (!window.confirm("Are you sure you want to delete this appeal?")) return;
  
    fetch(`http://localhost:8080/appeals/${id}`, {
      method: "DELETE",
    }).then(() => {
      setAppeals(prev => prev.filter(a => a.id !== id));
    });
  };
  
  const markAsViewed = (id) => {
    fetch(`http://localhost:8080/appeals/${id}/viewed`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updated) => {
        setAppeals(prev => prev.map(a => (a.id === id ? updated : a)));
      });
  };
  

  const indexOfLastAppeal = currentPage * appealsPerPage;
  const indexOfFirstAppeal = indexOfLastAppeal - appealsPerPage;
  const currentAppeals = filteredAppeals.slice(indexOfFirstAppeal, indexOfLastAppeal);
  const totalPages = Math.ceil(filteredAppeals.length / appealsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`md:hidden fixed top-4 ${sidebarOpen ? 'left-52' : 'left-4'} z-30 bg-blue-900 text-white p-3 rounded-md shadow-lg transition-all duration-300 ease-in-out`}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

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
              navigate("/admin/announcements");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaBullhorn /> <span>Announcements</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaInbox /> <span>Appeal Management</span>
          </button>
        </nav>
      </div>

      <div
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <div className="flex justify-around items-center flex-col mb-6 pt-12 md:pt-0">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📩 Appeal Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md mt-5 hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Recent Appeals</h2>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center space-x-4 mb-4">
            <FaSearch className="text-gray-500" />
            <input type="text" placeholder="Search appeals..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <ul>
            {currentAppeals.map((appeal) => (
              <li key={appeal.id} className="p-4 border rounded-lg shadow-sm mb-4 bg-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  
                  {/* Sol: Kullanıcı Bilgileri */}
                  <div className="flex-[2] space-y-1 text-sm text-gray-800">

                    <p><strong>User:</strong> {appeal.user}</p>
                    <p><strong>Email:</strong> {appeal.email}</p>
                    <p><strong>Phone:</strong> {appeal.phone}</p>
                    <p><strong>Subject:</strong> {appeal.subject}</p>
                    <p className="text-xs text-gray-500 mt-2"><strong>Date:</strong> {new Date(appeal.date).toLocaleString()}</p>
                  </div>

                  {/* Sağ: Content Kutusu */}
                  <div className="w-full md:flex-[5] bg-blue-100 border border-blue-300 p-5 rounded-md shadow-inner ml-2">

                    <h4 className="text-blue-800 font-bold mb-2 text-lg">📄 Appeal Content</h4>
                    <p className="whitespace-pre-wrap text-gray-800 text-sm">{appeal.content}</p>
                  </div>
                </div>

                {/* Butonlar */}
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => markAsViewed(appeal.id)} 
                    className={`px-3 py-1 rounded-md text-white ${appeal.viewed ? 'bg-green-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={appeal.viewed}
                  >
                    {appeal.viewed ? "Viewed" : "Mark as Viewed"}
                  </button>

                  <button 
                    onClick={() => deleteAppeal(appeal.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>


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

export default AppealManagement;
