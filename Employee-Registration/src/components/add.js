import React from "react";
import { useState } from "react";
import axios from "axios";  // Make sure axios is imported

function Add (props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const addEmployee = async () => {
      try {
        // Make a POST request to the backend API with the employee data
        const res = await axios.post("http://localhost:5001/api/addEmployee", {
          firstName,
          lastName,
          age,
          gender,
          email,
          phoneNumber: PhoneNumber,
          position,
        });

        // If the response is successful, handle accordingly
        if (res.data.success) {
          alert("Employee added successfully!");
        } else {
          setErrorMessage("Failed to add employee");
        }
      } catch (error) {
        console.error("There was an error adding the employee:", error);
        setErrorMessage("Error adding employee");
      }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (PhoneNumber) => {
      const re = /^\d{10}$/;
      return re.test(PhoneNumber);
    };

    const add = () => {
        if (!firstName || !lastName || !age || !gender || !email || !PhoneNumber || !position) {
            setErrorMessage("All fields are required");
            return;
        }

        if (!validateEmail(email)) {
          setErrorMessage("Invalid email format");
          return;
        }

        if (age < 16 || age > 65) {
          setErrorMessage("Age must be between 16 and 65");
          return;
        }

        if (!validatePhoneNumber(PhoneNumber)) {
          setErrorMessage("Phone number must be 10 digits");
          return;
        }
    
        // Clear the error message and call the function to add the employee
        setErrorMessage("");
        addEmployee();  // Call the function that sends data to the backend
        
        // Reset the input fields after submission
        setFirstName("");
        setLastName("");
        setAge("");
        setGender("");
        setEmail("");
        setPhoneNumber("");
        setPosition(""); 
    };

    return (
        <div className="Add employee">
            <div className="container">
              <h1>Add Employee</h1>
              {errorMessage && <p className="error">{errorMessage}</p>}

              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type="number" placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
              <input type="text" placeholder="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
              <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder="phonenumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <input type="text" placeholder="position" value={position} onChange={(e) => setPosition(e.target.value)} />
      
              <button className="add-button" onClick={add}>Submit</button>
            </div>
        </div>
    );
}

export default Add;
