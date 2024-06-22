import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Refer_Earn.css";
import host from "../../AppConfig";

const Refer_Earn = () => {
  const [notifications, Notifications] = useState([]);

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

  useEffect(() => {
    fetchRefers();
  }, []);

  return (
    <div className="ReferAndEarnContainer">
      <Sidebar />
      <div className="ReferAndEarnContent">
      <h1>Refer & Earn Info</h1>
      <div class="form-group">
      <label for="referCode">Monthly Refer Limit:</label>
      <input type="text" id="referCode" name="referCode" placeholder="Enter Monthly Limit" />
    </div>
    <div class="form-group">
      <label for="earnAmount">Refer Amount:</label>
      <input type="text" id="earnAmount" name="earnAmount" placeholder="Enter Refer Amount" />
    </div>
    <div class="button-group">
      <button class="save-button">Save</button>
      <button class="cancel-button">Cancel</button>
    </div>

    <br /><br />

        <table className="NotificationTable">
          <thead>
            <tr>
              <th>From Refer</th>
              <th>To Refer</th>
              <th>Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.notificationId}>
                <td>{notification.fromClient}</td>
                <td>{notification.toClient}</td>
                <td>{notification.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Refer_Earn;
