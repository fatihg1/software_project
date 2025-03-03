import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FinanceManagement = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    { id: 1, user: "Ali Yılmaz", amount: 150, type: "Sale", date: "2024-03-10" },
    { id: 2, user: "Ayşe Kaya", amount: 200, type: "Refund", date: "2024-03-12" },
    { id: 3, user: "Mehmet Demir", amount: 120, type: "Sale", date: "2024-03-15" },
  ]);

  // Calculate total revenue
  const totalRevenue = transactions
    .filter((t) => t.type === "Sale")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" onClick={() => navigate("/manager/finance")}>
            <FaMoneyBillWave /> <span>Financial Management</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Box */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-96">
            <FaSearch className="text-gray-400 mx-2" />
            <input type="text" placeholder="Search..." className="outline-none p-1 w-full" />
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">💳 Financial Management</h1>

          {/* Logout Button */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Total Revenue: <span className="text-green-600">{totalRevenue}₺</span>
          </h2>
        </div>

        {/* Payment Transactions Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Payment Transactions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Transaction Type</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t">
                  <td className="p-3">{transaction.user}</td>
                  <td className="p-3">{transaction.amount}₺</td>
                  <td className={`p-3 font-bold ${transaction.type === "Refund" ? "text-red-500" : "text-green-500"}`}>
                    {transaction.type}
                  </td>
                  <td className="p-3">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;
