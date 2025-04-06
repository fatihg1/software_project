import React, { useState, useEffect } from "react";
import { FaUsers, FaMoneyBillWave, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaEdit, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SalaryManagement = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const employeesPerPage = 7;


  useEffect(() => {
    fetch("http://localhost:8080/salary")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching salary data:", err));
  }, []);
  
  // Handle responsive behavior
  useEffect(() => {
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
    const employee = employees.find((e) => e.id === id);
    const updated = { ...employee, salary: newSalary };
  
    fetch(`http://localhost:8080/salary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(employees.map((e) => (e.id === id ? data : e)));
      })
      .catch((err) => console.error("Error updating salary:", err));
  };
  

  // Mark Salary as Paid/Unpaid
  const togglePaymentStatus = (id) => {
    const employee = employees.find((e) => e.id === id);
    const updated = { ...employee, status: employee.status === "Paid" ? "Unpaid" : "Paid" };
  
    fetch(`http://localhost:8080/salary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(employees.map((e) => (e.id === id ? data : e)));
      })
      .catch((err) => console.error("Error updating status:", err));
  };
  

  // Delete Confirmation Dialog
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this employee from payroll?");
    if (!confirmDelete) return;
  
    fetch(`http://localhost:8080/salary/${id}`, {
      method: "DELETE",
    })
      .then(() => setEmployees(employees.filter((e) => e.id !== id)))
      .catch((err) => console.error("Error deleting employee:", err));
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
          className="fixed inset-0 backdrop-blur-xs z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`bg-blue-900 text-white p-6 flex flex-col fixed h-screen z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Manager Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager");
              if (isMobile) setSidebarOpen(false);
            }}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/users");
              if (isMobile) setSidebarOpen(false);
            }}>
            <FaUsers /> <span>User Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/finance");
              if (isMobile) setSidebarOpen(false);
            }}>
            <FaMoneyBillWave /> <span>Financial Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaMoneyBillWave /> <span>Salary Management</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/manager/revenue");
              if (isMobile) setSidebarOpen(false);
            }}>
            <FaMoneyBillWave /> <span>Revenue Analysis</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pt-12 md:pt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 text-center md:text-center my-4 md:my-0">
            💰 Salary Management
          </h1>
          
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex items-center w-full md:w-auto">
            <FaSearch className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="p-2 border rounded-md w-full" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <select 
            className="p-2 border rounded-md w-full md:w-auto" 
            value={salaryFilter} 
            onChange={(e) => setSalaryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Employee Salary Table */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
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
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-4">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                <FaArrowLeft className="mr-1" /> Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Next <FaArrowRight className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement;