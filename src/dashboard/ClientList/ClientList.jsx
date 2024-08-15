import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import "./ClientList.css";
import host from "../../AppConfig";
import formatDate from "../../functions/formateDate";

const ClientList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${host}/api/v1/visitor/users_list`);
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const changeState = async (clientID, i, act) => {
    if (act == 0) act = 1;
    else act = 0;
    try {
      const response = await fetch(`${host}/api/v1/visitor/change_user_state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientID: clientID,
          activate: act,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status == 200) {
        if (act) alert("User Activated");
        else alert("User inActivated");
      }
      let u = users[i];
      u.isActive = act;
      users.splice(i, 1, u);
      setUsers([...users]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="DashboardContainer">
      <Sidebar />
      <div className="Dashboard">
        <h1>Users List</h1>
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Joined On</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.clientID}>
                <td>{user.clientID}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td> {user.isActive ? "Active" : "InActive"}</td>
                <td>
                  <button
                    onClick={() => changeState(user.clientID, i, user.isActive)}
                  >
                    {user.isActive ? "InActive" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
