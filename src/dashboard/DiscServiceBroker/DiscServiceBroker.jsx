import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import host from "../../AppConfig.js";
import AddDis from "./AddDis.jsx";
import "./DiscServiceBroker.css";
import EditDis from "./EditDis.jsx";

const DiscServiceBroker = () => {
  const [brokers, setBanners] = useState([]);
  const [editIndex, setEditIndex] = useState(0);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);

  useEffect(() => {
    getBrokers();
  }, []);

  async function getBrokers() {
    try {
      const response = await fetch(`${host}/api/v1/visitor/disBroker_list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBanners([...data]);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  }

  const handleIndexChange = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      index: e.target.value,
    };
    setBanners(newBanners);
  };

  const saveImg = async (i) => {
    try {
      const formData = new FormData();
      formData.append("banner_no", i + 1);
      formData.append("title", brokers[i].title);
      formData.append("url", brokers[i].url);
      formData.append("image", brokers[i].im);
      console.log(brokers[i]);

      const response = await fetch(`${host}/api/v1/visitor/update_banner`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status === 200) {
        alert("Banner updated successfully!");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const deleteBroker = async (i) => {
    try {
      const response = await fetch(
        `${host}/api/v1/visitor/delete_disbroker/${i}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status === 200) {
        alert("Banner updated successfully!");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="BannerAdminContainer">
      <Sidebar />
      <div className="BannerAdminContent">
        <h1>
          Discount Broker
          <button className="addbtn" onClick={() => setIsAddPopupVisible(true)}>
            Add
          </button>
        </h1>
        {isAddPopupVisible && (
          <AddDis
            onClose={(v) => {
              if (v == true) {
                getBrokers();
              }
              setIsAddPopupVisible(false);
            }}
          />
        )}
        {isEditPopupVisible && (
          <EditDis
            initialData={brokers[editIndex]}
            onClose={(v) => {
              if (v == true) {
                getBrokers();
              }
              setIsEditPopupVisible(false);
            }}
          />
        )}

        <div className="BannerGrid">
          {brokers.map((broker, index) => (
            <div className="img_box" key={index}>
              <div
                className="FullBroLogo"
                style={{
                  backgroundImage: broker.brokerId
                    ? `url(${host}/discount/logo-${broker.brokerId}.png)`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <br />
              <div
                className="FullBroImg"
                style={{
                  backgroundImage: broker.brokerId
                    ? `url(${host}/discount/bgImg-${broker.brokerId}.png)`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <br />
              <strong>Title: </strong>
              {broker.title ?? ""}
              <br />
              <strong>body : </strong>
              {broker.body ?? ""}
              <br />
              <strong>URL : </strong>
              {broker.url ?? ""}
              <br />
              <strong>index : </strong>
              <input
                type="number"
                value={broker.index ?? ""}
                onChange={(e) => handleIndexChange(e, index)}
                className="txtInput"
              />
              <br />
              <br />
              <button onClick={() => saveImg(index)}>Change Index</button>
              <button
                style={{ backgroundColor: "teal" }}
                onClick={() => {
                  setEditIndex(index);
                  setIsEditPopupVisible(true);
                }}
              >
                Edit Broker
              </button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => deleteBroker(broker.brokerId)}
              >
                Delete Broker
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscServiceBroker;
