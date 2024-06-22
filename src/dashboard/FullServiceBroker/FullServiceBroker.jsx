import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import host from "../../AppConfig.js";
import AddDis from "./AddDis.jsx";
import EditDis from "./EditDis.jsx";
import "./FullServiceBroker.css";

const FullServiceBroker = () => {
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
      for (let i = 0; i < data.length; i++) {
        data[i].brokerId = data[i].id;
      }
      setBanners([...data]);
    } catch (error) {
      console.error("Error fetching Brokers:", error);
    }
  }

  const handleIndexChange = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      ind: e.target.value,
    };
    setBanners(newBanners);
  };

  const chnageIndex = async (i, j) => {
    try {
      const response = await fetch(
        `${host}/api/v1/visitor/update_index/${i}/${j}`,
        {
          method: "POST",
          body: {},
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status === 200) {
        alert("Broker Index updated successfully!");
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
        alert("Broker Deleted successfully!");
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
          Full Service Broker
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
            brokerId={brokers[editIndex].brokerId}
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
              <span className="line-clamp-2">{broker.body ?? ""}</span>
              {/* {broker.body ?? ""} */}
              <br />
              <strong>URL : </strong>
              {broker.dematURL ?? ""}
              <br />
              <strong>index : </strong>
              <input
                type="number"
                value={broker.ind ?? ""}
                onChange={(e) => handleIndexChange(e, index)}
                className="txtInput"
              />
              <br />
              <br />
              <button onClick={() => chnageIndex(broker.brokerId, broker.ind)}>
                Change Index
              </button>
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

export default FullServiceBroker;
