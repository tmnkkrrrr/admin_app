import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css"; // Optional: Create and import a CSS file for styling

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://llions_back.techharmony.co.in/api/v1/visitor/users_list"
        ); // Replace with your API endpoint
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="DashboardContainer">
      <div className="Sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="Dashboard">
        <h1>Users List</h1>
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.clientID}>
                <td>{user.clientID}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>{user.address}</td>
                <td>{user.createdAt}</td>
                <td>{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
