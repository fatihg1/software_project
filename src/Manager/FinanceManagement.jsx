import React, { useState, useEffect } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FinanceManagement = () => {
  const navigate = useNavigate();
  const [salesRefunds, setSalesRefunds] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const recordsPerPage = 7;

  useEffect(() => {
    fetch("http://localhost:8080/finance")
      .then((res) => res.json())
      .then((data) => setSalesRefunds(data))
      .catch((err) => console.error("Error fetching finance data:", err));
  }, []);
  
  // Check if the screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredRecords = salesRefunds.filter((record) =>
    (record.user.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (paymentFilter === "All" || record.type === paymentFilter)
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Calculate total revenue from sales
  const totalRevenue = salesRefunds
    .filter((r) => r.type === "Sale")
    .reduce((sum, r) => sum + r.amount, 0);


    
    const deleteRecord = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this record?");
      if (!confirmDelete) return;
    
      fetch(`http://localhost:8080/finance/${id}`, {
        method: "DELETE",
      })
        .then(() => setSalesRefunds(salesRefunds.filter((record) => record.id !== id)))
        .catch((err) => console.error("Error deleting record:", err));
    };
    

  return (
    <div className="flex h-screen bg-gray-100 relative">
      
      {/* Mobile menu toggle button */}
      <button 
        className={`md:hidden fixed top-4 ${sidebarOpen ? 'left-52' : 'left-4'} z-50 bg-blue-900 text-white p-3 rounded-md shadow-lg transition-all duration-300 ease-in-out`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-blue-900 text-white p-6 flex flex-col fixed h-screen z-30 transition-transform duration-300 ease-in-out`}>
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaMoneyBillWave /> <span>Financial Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/salary")}>
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/revenue")}>
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>

      {/* Main content - adjust margin based on sidebar state */}
      <div className={`flex-1 p-6 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        
        {/* Header */}
        <div className="flex justify-between items-center flex-col mb-6 mt-8 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 text-center">💳 Sales & Refunds</h1>
          <button className="bg-red-600 text-white mt-5 px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Total Revenue from Sales: <span className="text-green-600">{totalRevenue}₺</span>
          </h2>
        </div>

        {/* Search & Filter */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex items-center space-x-2 w-full">
            <FaSearch className="text-gray-500" />
            <input type="text" placeholder="Search sales & refunds..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <select className="p-2 border rounded-md w-full md:w-auto" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Sale">Sale</option>
            <option value="Refund">Refund</option>
          </select>
        </div>

        {/* Sales & Refunds Table */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">Sales & Refunds Records</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Payment Type</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="p-3">{record.user}</td>
                  <td className="p-3">{record.amount}₺</td>
                  <td className={`p-3 font-bold ${record.type === "Refund" ? "text-red-500" : "text-green-500"}`}>
                    {record.type}
                  </td>
                  <td className="p-3">{record.date}</td>
                  <td className="p-3">
                    <button title="Delete Record" className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => deleteRecord(record.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
            <button disabled={currentPage === 1} className="bg-gray-300 px-4 py-2 rounded-md w-full md:w-auto" onClick={prevPage}>
              <FaArrowLeft className="inline mr-1" /> Prev
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} className="bg-gray-300 px-4 py-2 rounded-md w-full md:w-auto" onClick={nextPage}>
              Next <FaArrowRight className="inline ml-1" />
            </button>
          </div>
        </div>

      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 backdrop-blur-xs z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default FinanceManagement;