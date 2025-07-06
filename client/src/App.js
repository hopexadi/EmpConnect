import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmployeeManagementApp from "./Components/EmployeeManagementApp";
import EmployeeDetails from "./Components/EmployeeDetails";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
        overflowX: "hidden", // prevents horizontal scrollbar
      }}
    >
      <BrowserRouter>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<Navigate to="employee" />} />
            <Route path="/employee" element={<EmployeeManagementApp />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "1rem 0",
            backgroundColor: "#1e1b2e",
            color: "#c084fc",
            fontSize: "0.9rem",
            width: "100%",
            marginTop: "auto", // pushes footer to bottom
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          © Aditya Kumar Behera 2025
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
