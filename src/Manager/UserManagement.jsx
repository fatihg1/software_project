import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaUserEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Yılmaz", role: "user" },
    { id: 2, name: "Ayşe Kaya", role: "admin" },
    { id: 3, name: "Mehmet Demir", role: "user" },
    { id: 4, name: "Fatma Aydın", role: "manager" },
    { id: 5, name: "Burak Can", role: "user" },
    { id: 6, name: "Emre Güler", role: "manager" },
    { id: 7, name: "Zeynep Arslan", role: "admin" },
    { id: 8, name: "Kadir Öztürk", role: "user" },
    { id: 9, name: "Gizem Polat", role: "admin" },
  ]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  const filteredUsers = users.filter((user) =>
    (user.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (roleFilter === "All" || user.role === roleFilter)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to delete a user (With Confirmation)
  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Function to cycle through roles (User → Manager → Admin → User)
  const toggleRole = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const roles = ["user", "manager", "admin"];
        const newRole = roles[(roles.indexOf(user.role) + 1) % roles.length];
        return { ...user, role: newRole };
      }
      return user;
    }));
  };

  // Function to add a new user
  const addUser = () => {
    if (name.trim() === "") return;
    const newUser = { id: users.length + 1, name, role };
    setUsers([...users, newUser]);
    setName("");
    setRole("user");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 👥 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/finance")}>
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

      <div className="flex-1 p-6">
        
        {/* 👥 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">👥 User Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* 👥 Add a New User Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add a New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="User Name" className="p-2 border rounded-md w-full" value={name} onChange={(e) => setName(e.target.value)} />
            <select className="p-2 border rounded-md w-full" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center space-x-2" onClick={addUser}>
              <FaPlus /> <span>Add User</span>
            </button>
          </div>
        </div>

        {/* 👥 User List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Users</h2>

          {/* 🔍 Search & Filter */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center space-x-4 mb-4">
            <FaSearch className="text-gray-500" />
            <input type="text" placeholder="Search users..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <select className="p-2 border rounded-md" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* User List Table */}
          <table className="w-full border-collapse">
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className={`p-3 font-bold ${user.role === "admin" ? "text-red-500" : user.role === "manager" ? "text-yellow-500" : "text-blue-500"}`}>{user.role}</td>
                  <td className="p-3 flex space-x-2">
                    <button title="Change Role" className="bg-yellow-500 text-white px-3 py-1 rounded-md" onClick={() => toggleRole(user.id)}><FaUserEdit /></button>
                    <button title="Delete User" className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => deleteUser(user.id)}><FaTrash /></button>
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
