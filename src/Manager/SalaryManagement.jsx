import React, { useState } from "react";
import { FaUsers, FaMoneyBillWave, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaEdit, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SalaryManagement = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    { id: 1, name: "Ayşe Kaya", role: "admin", salary: 10000, status: "Unpaid" },
    { id: 2, name: "Fatma Aydın", role: "manager", salary: 9000, status: "Paid" },
    { id: 3, name: "Zeynep Arslan", role: "admin", salary: 11000, status: "Unpaid" },
    { id: 4, name: "Emre Güler", role: "manager", salary: 9500, status: "Paid" },
    { id: 5, name: "Gizem Polat", role: "admin", salary: 10200, status: "Unpaid" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 7;

  const filteredEmployees = employees.filter((employee) =>
    (employee.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (salaryFilter === "All" || employee.status === salaryFilter)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Update Salary
  const updateSalary = (id, newSalary) => {
    setEmployees(employees.map(employee =>
      employee.id === id ? { ...employee, salary: newSalary } : employee
    ));
  };

  // Mark Salary as Paid/Unpaid
  const togglePaymentStatus = (id) => {
    setEmployees(employees.map(employee =>
      employee.id === id ? { ...employee, status: employee.status === "Paid" ? "Unpaid" : "Paid" } : employee
    ));
  };

  // Delete Confirmation Dialog
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this employee from payroll?");
    if (confirmDelete) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 💰 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col fixed h-screen">
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/users")}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/finance")}>
            <FaMoneyBillWave /> <span>Financial Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/manager/revenue")}>
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6 ml-64 overflow-auto">
        
        {/* 💰 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">💰 Salary Management</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* 💰 Search & Filter */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center space-x-4 mb-6">
          <FaSearch className="text-gray-500" />
          <input type="text" placeholder="Search employees..." className="p-2 border rounded-md w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="p-2 border rounded-md" value={salaryFilter} onChange={(e) => setSalaryFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* 💰 Employee Salary Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Employee Salaries</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Salary (₺)</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="border-t">
                  <td className="p-3">{employee.name}</td>
                  <td className={`p-3 font-bold ${employee.role === "admin" ? "text-red-500" : "text-yellow-500"}`}>{employee.role}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="p-1 border rounded-md w-24"
                      value={employee.salary}
                      onChange={(e) => updateSalary(employee.id, Number(e.target.value))}
                    />
                  </td>
                  <td className={`p-3 font-bold ${employee.status === "Paid" ? "text-green-500" : "text-red-500"}`}>
                    {employee.status}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button title="Toggle Payment Status" className="bg-yellow-500 text-white px-3 py-1 rounded-md" onClick={() => togglePaymentStatus(employee.id)}>
                      {employee.status === "Paid" ? <FaTimesCircle /> : <FaCheckCircle />}
                    </button>
                    <button title="Remove Employee" className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => deleteEmployee(employee.id)}>
                      <FaTrash />
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

export default SalaryManagement;
