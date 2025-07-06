import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // ✅ Ensure CSS is imported

function EmployeeTable({
  employees,
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
}) {
  const headers = ["Name", "Email", "Phone No.", "Department", "Actions"];
  const { currentPage, totalPages } = pagination;

  const handlePagination = (page) => {
    fetchEmployees("", page, 5);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePagination(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) handlePagination(currentPage - 1);
  };

  const TableRow = ({ employee }) => {
    return (
      <tr className="employee-row">
        <td className="employee-cell">
          <Link
            to={`/employee/${employee._id}`}
            className="text-decoration-none emp-name-link"
          >
            {employee.name}
          </Link>
        </td>
        <td className="employee-cell">{employee.email}</td>
        <td className="employee-cell">{employee.phone}</td>
        <td className="employee-cell">{employee.department}</td>
        <td className="employee-cell">
          <i
            className="bi bi-pencil-fill me-3 text-warning"
            role="button"
            title="Edit"
            onClick={() => handleUpdateEmployee(employee)}
          ></i>
          <i
            className="bi bi-trash-fill text-danger"
            role="button"
            title="Delete"
            onClick={() => handleDeleteEmployee(employee._id)}
          ></i>
        </td>
      </tr>
    );
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="employee-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} className="employee-empty text-center">
                  Data Not Found
                </td>
              </tr>
            ) : (
              employees.map((emp) => <TableRow employee={emp} key={emp._id} />)
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        <span className="page-badge">
          Page {currentPage} of {totalPages}
        </span>
        <div className="d-flex flex-wrap align-items-center">
          <button
            className="btn-outline-purple"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn-outline-purple ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn-outline-purple"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
