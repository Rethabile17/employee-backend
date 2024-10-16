import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeList.css";

function EmployeeList({ onDelete, onUpdate }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    position: "",
    id: "",
  });



  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5001/api/deleteEmployee/${id}`);
      if (res.data.success) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Handle Update Click: Open modal and set current employee data
  const handleUpdateClick = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setUpdatedEmployee(employee);
      console.log("Selected employee ID for update:", employee.id); // Log employee ID for debugging
      setShowUpdateModal(true);
    }
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Update to Backend
  const handleSave = async () => {
    try {
      console.log("Updating Employee Data:", updatedEmployee); // Log data before sending
  
      const res = await axios.put(
        `http://localhost:5001/api/updateEmployee/${updatedEmployee.id}`,
        updatedEmployee
      );
  
      console.log("Response from API:", res); // Log response object
  
      if (res.data.success) {
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setShowUpdateModal(false); // Close modal after successful update
      } else {
        console.error("Failed to update employee:", res.data.message); // Log specific API failure message
      }
    } catch (error) {
      console.error("Error updating employee:", error.response ? error.response.data : error.message); // Log error
    }
  };
  
  // Fetch Employees from Backend
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/getEmployees");
      setEmployees(res.data.data); // Ensure this matches your API response structure
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees on component mount
  }, []);

  console.log(employees)

  const addEmployee = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/addEmployee", {

      });
      setEmployees(res.data.data); 
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="employee-list">
      <h2 className="employeeList-head">Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>{employee.gender}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.position}</td>
              <td>
                <button
                  className="employeeList-button-delete"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="employeeList-button"
                  onClick={() => handleUpdateClick(employee.id)} // Use employee ID for update
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Employee</h3>
            <input
              type="text"
              name="firstName"
              value={updatedEmployee.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={updatedEmployee.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              type="number"
              name="age"
              value={updatedEmployee.age}
              onChange={handleInputChange}
              placeholder="Age"
            />
            <input
              type="text"
              name="gender"
              value={updatedEmployee.gender}
              onChange={handleInputChange}
              placeholder="Gender"
            />
            <input
              type="text"
              name="email"
              value={updatedEmployee.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phoneNumber"
              value={updatedEmployee.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="position"
              value={updatedEmployee.position}
              onChange={handleInputChange}
              placeholder="Position"
            />
            {/* Removed ID input field */}
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
