import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Yılmaz", role: "user" },
    { id: 2, name: "Ayşe Kaya", role: "admin" },
    { id: 3, name: "Mehmet Demir", role: "user" },
  ]);

  // Function to delete a user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Function to toggle user role
  const toggleRole = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/finance")}>
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
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">👥 User Management</h1>

          {/* Logout Button */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* User List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Users</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3 font-bold">
                    {user.role === "admin" ? <span className="text-red-500">Admin</span> : <span className="text-blue-500">User</span>}
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => toggleRole(user.id)}
                    >
                      Change Role
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
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

export default UserManagement;
