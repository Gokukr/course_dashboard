import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TrainerDashboard = () => {
  const { trainerId } = useParams(); // Get trainerId from URL parameters
  const [reqEmployees, setReqemployees] = useState([]); // State to store employees from /fetchEmployees
  const [employees, setEmployees] = useState([]); // State to store employee details for specific trainer
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [marks, setMarks] = useState({}); // State to manage marks for employees

  // Fetch employee details specific to the trainer
  useEffect(() => {
    const trainerId = localStorage.getItem("id");

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/trainer/fetchTrainers/${trainerId}`
        );
        setEmployees(response.data.employees); // Assuming the response contains an 'employees' array
      } catch (err) {
        setError("Failed to fetch employees."); // Handle error
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchEmployees();
  }, [trainerId]); // Run effect when trainerId changes

  // Fetch employee details from /fetchEmployees
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/trainer/fetchEmployees"
        );
        console.log(response.data);

        setReqemployees(response.data); // Store the response data in reqEmployees state
      } catch (err) {
        console.error("Failed to fetch employee details:", err);
      }
    };

    fetchAllEmployees();
  }, []); // This effect runs once when the component mounts

  // Handle input change for marks
  const handleMarkChange = (employeeId, markType, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [employeeId]: {
        ...prevMarks[employeeId],
        [markType]: value,
      },
    }));
  };

  // Submit marks for an employee
  const handleSubmitMarks = async (employeeId) => {
    const { mark1, mark2 } = marks[employeeId];

    try {
      await axios.post(
        `http://localhost:4000/user/employees/${employeeId}/addMarks`,
        {
          courseId: reqEmployees[0].course_id, // Assuming first employee's course ID
          mark1,
          mark2,
        }
      );
      alert("Marks added successfully!");
    } catch (err) {
      alert("Failed to add marks.");
    }
  };

  // Render loading, error, or employee details
  if (loading) {
    return <div className="text-light">Loading employees...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>; // Display error message
  }

  return (
    <div className="p-6 bg-whiter">
      <h1 className="text-dark text-2xl mb-4">
        Employees for Trainer ID: {localStorage.getItem("id")}
      </h1>

      {/* Table for trainer-specific employees */}
      <h2 className="text-xl mb-4">Trainer's Employees</h2>
      <table className="min-w-full border-collapse border border-darker mb-8">
        <thead>
          <tr>
            <th className="border border-dark p-2">ID</th>
            <th className="border border-dark p-2">Name</th>
            <th className="border border-dark p-2">Email</th>
            <th className="border border-dark p-2">Course Name</th>
            <th className="border border-dark p-2">Mark 1</th>
            <th className="border border-dark p-2">Mark 2</th>
            <th className="border border-dark p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reqEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-light p-2">{employee.id}</td>
              <td className="border border-light p-2">{employee.name}</td>
              <td className="border border-light p-2">{employee.email}</td>
              <td className="border border-light p-2">
                {employee.course?.name}
              </td>
              <td className="border border-light p-2">
                <input
                  type="number"
                  value={marks[employee.id]?.mark1 || ""}
                  onChange={(e) =>
                    handleMarkChange(employee.id, "mark1", e.target.value)
                  }
                  placeholder="Enter Mark 1"
                  className="border border-gray-400 p-1 rounded"
                />
              </td>
              <td className="border border-light p-2">
                <input
                  type="number"
                  value={marks[employee.id]?.mark2 || ""}
                  onChange={(e) =>
                    handleMarkChange(employee.id, "mark2", e.target.value)
                  }
                  placeholder="Enter Mark 2"
                  className="border border-gray-400 p-1 rounded"
                />
              </td>
              <td className="border border-light p-2">
                <button
                  onClick={() => handleSubmitMarks(employee.id)}
                  className="bg-dark text-whiter p-2 rounded"
                >
                  Add Marks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table for reqEmployees fetched from /fetchEmployees
      <h2 className="text-xl mb-4">All Employees</h2>
      <table className="min-w-full border-collapse border border-darker">
        <thead>
          <tr>
            <th className="border border-dark p-2">ID</th>
            <th className="border border-dark p-2">Name</th>
            <th className="border border-dark p-2">Email</th>
            <th className="border border-dark p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {reqEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-light p-2">{employee.id}</td>
              <td className="border border-light p-2">{employee.name}</td>
              <td className="border border-light p-2">{employee.email}</td>
              <td className="border border-light p-2">{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default TrainerDashboard;
