import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./NotificationBroadcast.css";
import formatDate from "../Components/formatedate";
import host from "../../AppConfig";

const NotificationBroadcast = () => {
  const [title, Title] = useState("");
  const [body, Body] = useState("");
  const [isLoading , IsLoading] = useState(false);
  const [notifications, Notifications] = useState([]);
  const broadcastNotification = async () => {
    try {
      IsLoading(true);
      const response = await fetch(`${host}/api/v1/visitor/send-noti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      IsLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.status === 200) {
        alert("Notification broadcasted successfully!");
        Title("");
        Body("");
        fetchNotifications();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${host}/api/v1/visitor/notifications`, {
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
    fetchNotifications();
  }, []);

  const deleteNotification = async (v) => {
    try {
      const response = await fetch(`${host}/api/v1/visitor/delete_notification/${v}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Failed to Delete Entry");
        return;
      }
      alert("Notification Deleted Success")
    fetchNotifications()
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="ReferAndEarnContainer">
      <Sidebar />
      <div className="ReferAndEarnContent">
        <input
          type="text"
          value={title}
          onChange={(e) => Title(e.target.value)}
          className="TitleTextBox"
          placeholder="Title..."
        />
        <textarea
          className="BodyTextBox"
          value={body}
          onChange={(e) => Body(e.target.value)}
          placeholder="Write your Notification ody here"
        />
       { isLoading?
        'Loading...':
        <button onClick={broadcastNotification}>Brodcast Notification</button>}
        <br /><br />

        <table className="NotificationTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Shooted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <tr key={notification.notificationId}>
                <td>{notification.title}</td>
                <td>{notification.body}</td>
                <td>{formatDate(notification.createdAt)}</td>
                <td><button onClick={()=>deleteNotification(notification.notificationId)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationBroadcast;
