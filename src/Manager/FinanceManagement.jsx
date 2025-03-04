import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FinanceManagement = () => {
  const navigate = useNavigate();
  const [salesRefunds, setSalesRefunds] = useState([
    { id: 1, user: "Ali Yılmaz", amount: 150, type: "Sale", date: "2024-03-10" },
    { id: 2, user: "Ayşe Kaya", amount: 200, type: "Refund", date: "2024-03-12" },
    { id: 3, user: "Mehmet Demir", amount: 120, type: "Sale", date: "2024-03-15" },
    { id: 4, user: "Fatma Aydın", amount: 180, type: "Sale", date: "2024-03-18" },
    { id: 5, user: "Burak Can", amount: 90, type: "Refund", date: "2024-03-20" },
    { id: 6, user: "Emre Güler", amount: 250, type: "Sale", date: "2024-03-22" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

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

  // Delete Confirmation Dialog
  const deleteRecord = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      setSalesRefunds(salesRefunds.filter((record) => record.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 💰 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaMoneyBillWave /> <span>Sales & Refunds</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/salary")}>
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/revenue")}>
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6">
        
        {/* 💰 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">💳 Sales & Refunds</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* 💰 Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Total Revenue from Sales: <span className="text-green-600">{totalRevenue}₺</span>
          </h2>
        </div>

        {/* 💰 Search & Filter */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center space-x-4 mb-6">
          <FaSearch className="text-gray-500" />
          <input type="text" placeholder="Search sales & refunds..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="p-2 border rounded-md" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Sale">Sale</option>
            <option value="Refund">Refund</option>
          </select>
        </div>

        {/* 💰 Sales & Refunds Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
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
          <div className="flex justify-between mt-4">
            <button disabled={currentPage === 1} className="bg-gray-300 px-4 py-2 rounded-md" onClick={prevPage}>
              <FaArrowLeft /> Prev
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} className="bg-gray-300 px-4 py-2 rounded-md" onClick={nextPage}>
              Next <FaArrowRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinanceManagement;
