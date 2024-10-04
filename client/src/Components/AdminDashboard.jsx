import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CoursePieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
const AdminDashboard = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/marks")
      .then((response) => response.json())
      .then((data) => setMarks(data))
      .catch((error) => console.error("Error fetching marks:", error));
  }, []);

  return (
    <div className="flex min-h-screen bg-light">
      {/* Sidebar */}
      <aside className="w-64 bg-darker text-whiter p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a
              href="/admin-dashboard"
              className="text-mid hover:text-light font-semibold block"
            >
              Dashboard Overview
            </a>
          </li>
          <li className="mb-4">
            <Link
              to="/AddTrainer"
              className="text-mid hover:text-light font-semibold block"
            >
              Trainers
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/AddEmployee"
              className="text-mid hover:text-light font-semibold block"
            >
              Employees
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/AddCourses"
              className="text-mid hover:text-light font-semibold block"
            >
              Courses
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-whiter">
        <h1 className="text-3xl font-bold text-dark mb-4">Welcome Admin</h1>
        <p className="text-lg text-mid">
          Here you can manage users, view reports, and adjust settings.
        </p>

        {/* Bar Chart */}
        <div className="grid grid-cols-2 gap-2">
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Employee Marks Overview</h2>
            <BarChart marks={marks} />{" "}
            {/* Pass the marks data to the bar chart */}
          </div>

          {/* Pie Chart */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">
              Course Enrollment Distribution
            </h2>
            <CoursePieChart marks={marks} />{" "}
            {/* Pass the marks data to the pie chart */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
