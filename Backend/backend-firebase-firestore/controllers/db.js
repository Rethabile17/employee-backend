const { collection, addDoc, deleteDoc, doc, getDocs, setDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");

const addEmployee = async (req, res) => {
  console.log("Request body:", req.body); // Log the request body for debugging

  const { firstName, lastName, age, gender, email, phoneNumber, position } = req.body;

  // Check for missing fields
  const missingFields = [];
  if (!firstName) missingFields.push("First name");
  if (!lastName) missingFields.push("Last name");
  if (!age) missingFields.push("Age");
  if (!gender) missingFields.push("Gender");
  if (!email) missingFields.push("Email");
  if (!phoneNumber) missingFields.push("Phone number");
  if (!position) missingFields.push("Position");


  // If any fields are missing, return a detailed error message
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following fields are required: ${missingFields.join(", ")}`,
    });
  }

  try {
    const docRef = await addDoc(collection(db, "employees"), {
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      position: position,
    });

    res.json({
      message: "Added successfully",
    });
  } catch (error) {
    console.log("Error adding employee:", error);
    res.status(500).json({
      message: "Error adding employee",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting employee with id:", id);
    const employeeDocRef = doc(db, "employees", id);
    await deleteDoc(employeeDocRef);
    res.json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    console.log("Error in deleting employee", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

const getEmployees = async (req, res ) => {
  try {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const data = querySnapshot.docs.map((doc) => ({
      id:doc.id,
      ...doc.data(),
    }));
    res.json({
      data: data,
    
    });
  } catch(error) {
    console.log("Error in getting employee", error);
    res.status(500).json({ message: "Error in getting employees", error });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age, gender, email, phoneNumber, position,} = req.body;

  
    if (!firstName || !lastName || !age || !gender || !email || !phoneNumber || !position )  {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employeeDocRef = doc(db, "employees", id);

  
    await setDoc(employeeDocRef, { firstName, lastName, age, gender, email, phoneNumber, position }, { merge: true });

    res.json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error updating employee", error);
    res.status(500).json({ message: "Failed to update employee" });
  }
};


module.exports = {
  addEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee
};
