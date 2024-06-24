import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Refer_Earn.css";
import host from "../../AppConfig";
import formatDate from "../../functions/formateDate";

const Refer_Earn = () => {
  const [notifications, Notifications] = useState([]);
  const [config, Config] = useState({
    monthlyLimit: "Loading...",
    amount: "Loading...",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    Config((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const fetchRefers = async () => {
    try {
      const response = await fetch(`${host}/api/v1/visitor/refers`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Failed to Get Sent Notifications List");
        return;
      }
      const data = await response.json();
      console.log(data);
      Notifications(data);
    } catch (err) {
      // setError(err.message);
    } finally {
      // setLoading(false);
    }
  };

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${host}/api/v1/visitor/refers_values`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Failed to Get Sent Notifications List");
        return;
      }
      Config(await response.json());
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${host}/api/v1/visitor/update_refers_values`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(config),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert("Values Updated Successfully");
      } else {
        alert("Failed to Update Values");
      }
    } catch (error) {
      alert("Failed to Update Values");
    }
  };

  useEffect(() => {
    fetchRefers();
    fetchConfig();
  }, []);

  const payAmt = async (v) => {
    try {
      if ("LKONS" != prompt("Please type LKONS to Pay :")) return;

      const response = await fetch(`${host}/api/v1/visitor/pay_refer/${v}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Failed to Pay");
        return;
      }
      alert("Amount Set to Paid");
      fetchRefers();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="ReferAndEarnContainer">
      <Sidebar />
      <div className="ReferAndEarnContent">
        <h1>Refer & Earn Info</h1>
        <div class="form-group">
          <label for="referCode">Monthly Refer Limit:</label>
          <input
            type="number"
            id="referCode"
            value={config.monthlyLimit}
            onChange={handleInputChange}
            name="monthlyLimit"
            placeholder="Enter Monthly Limit"
          />
        </div>
        <div class="form-group">
          <label for="earnAmount">Refer Amount:</label>
          <input
            type="number"
            id="earnAmount"
            name="amount"
            value={config.amount}
            onChange={handleInputChange}
            placeholder="Enter Refer Amount"
          />
        </div>
        <div class="button-group">
          <button onClick={handleSubmit} class="save-button">
            Save
          </button>
          <button class="cancel-button">Cancel</button>
        </div>

        <br />
        <br />

        <table className="NotificationTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>From Name</th>
              <th>From ID</th>
              <th>To Name</th>
              <th>To ID</th>
              <th>Amount Spent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.referId}>
                <td>{formatDate(notification.dat)}</td>
                <td>{notification.fromName}</td>
                <td>{notification.fromID}</td>
                <td>{notification.toName}</td>
                <td>{notification.toID}</td>
                <td>{notification.amount}</td>
                {notification.paid ? (
                  <td>Already Paid</td>
                ) : (
                  <td>
                    <button onClick={() => payAmt(notification.referId)}>
                      Pay amount
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Refer_Earn;
