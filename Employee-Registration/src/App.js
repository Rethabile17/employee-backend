import React, { useState } from "react";
import "./App.css";
import Add from "../src/components/add";
import EmployeeList from "../src/components/EmployeeList";
import SearchFunction from "../src/components/SearchFunction";

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addEmployee = (
    name,
    lastName,
    age,
    gender,
    email,
    phoneNumber,
    position,
  ) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        name,
        lastName,
        age,
        gender,
        email,
        phoneNumber,
        position,
      },
    ]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.id.includes(searchTerm)
  );

  return (
    <div className="App">
      <Add add={addEmployee} />
      <EmployeeList employees={filteredEmployees} onDelete={deleteEmployee} onUpdate={updateEmployee} />
      <SearchFunction onSearch={handleSearch} />
    </div>
  );
}

export default App;
