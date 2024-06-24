import React from "react";
import {Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('auth');
    navigate("/login");
  }
  return (
    <div className="Sidebar">
      <h2>Welcome to WebAdmin</h2>
      <ul>
        <li>
          <i className="fas fa-users"></i>
          <Link to="/dashboard/client_list">Client's List</Link>
        </li>
        <li>
          <i className="fas fa-award"></i>
          <Link to="/dashboard/banner">Banner</Link>
        </li>
        <li>
          <i className="fas fa-award"></i>
          <Link to="/dashboard/discount_broker">Discount Brokers</Link>
        </li>
        <li>
          <i className="fas fa-award"></i>
          <Link to="/dashboard/fullservice_broker">Full Service Brokers</Link>
        </li>
        <li>
          <i className="fas fa-award"></i>
          <Link to="/dashboard/refer_earn">Refer & Earn</Link>
        </li>
        <li>
          <i className="fas fa-bell"></i>
          <Link to="/dashboard/notifications">Notification Brodcast</Link>
        </li>
        <li onClick={logout}>
          <i className="fas fa-bell"></i>Logout
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
