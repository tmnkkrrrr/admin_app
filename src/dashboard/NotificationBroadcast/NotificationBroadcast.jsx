import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./NotificationBroadcast.css";
import formatDate from "../Components/formatedate";
import host from "../../AppConfig";

const NotificationBroadcast = () => {
  const [title, Title] = useState("");
  const [body, Body] = useState("");
  const [url, Url] = useState("");
  const [isLoading, IsLoading] = useState(false);
  const [notifications, Notifications] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const broadcastNotification = async () => {
    if (!title || !body) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('url', url);
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${host}/api/v1/visitor/send-noti`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.status === 200) {
        alert('Notification broadcasted successfully!');
        Title('');
        Body('');
        Url('')
        setImageFile(null);
        setImagePreview(null);
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error:', err);
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
      const response = await fetch(
        `${host}/api/v1/visitor/delete_notification/${v}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Failed to Delete Entry");
        return;
      }
      alert("Notification Deleted Success");
      fetchNotifications();
    } catch (err) {
      alert(err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
         <input
          type="text"
          value={url}
          onChange={(e) => Url(e.target.value)}
          className="TitleTextBox"
          placeholder="Please Enter URL..."
        />
        {isLoading ? (
          "Loading..."
        ) : (
          <button onClick={broadcastNotification}>Brodcast Notification</button>
        )}
        <br />
        <br />

        <table className="NotificationTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>img</th>
              <th>Url</th>
              <th>Shooted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.notificationId}>
                <td>{notification.title}</td>
                <td>{notification.body}</td>
                <td><img style={{maxWidth:'5vw'}} src={`${host}/notification/${notification.notificationId}.png`}/></td>
                <td>{notification.url}</td>
                <td>{formatDate(notification.createdAt)}</td>
                <td>
                  <button
                    onClick={() =>
                      deleteNotification(notification.notificationId)
                    }
                  >
                    Delete
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

export default NotificationBroadcast;
