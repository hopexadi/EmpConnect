import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import { DeleteEmployeeById, GetAllEmployees } from "../api";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";
import "../App.css"; // ✅ Import the shared CSS

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeObj, setEmployeeObj] = useState(null);
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeesData(data);
    } catch (err) {
      notify("Error fetching employees", "error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };

  const handleUpdateEmployee = (emp) => {
    setEmployeeObj(emp);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await DeleteEmployeeById(id);
      notify("Employee deleted successfully", "success");
      fetchEmployees();
    } catch (err) {
      notify("Error deleting employee", "error");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <div className="logo">EmpConnect</div>

      <div className="container-box">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <button className="btn-purple" onClick={() => setShowModal(true)}>
            Add
          </button>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search Employees..."
            className="search-input"
          />
        </div>

        <EmployeeTable
          employees={employeesData.employees}
          pagination={employeesData.pagination}
          fetchEmployees={fetchEmployees}
          handleUpdateEmployee={handleUpdateEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
        />

        <AddEmployee
          fetchEmployees={fetchEmployees}
          showModal={showModal}
          setShowModal={setShowModal}
          employeeObj={employeeObj}
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default EmployeeManagementApp;
