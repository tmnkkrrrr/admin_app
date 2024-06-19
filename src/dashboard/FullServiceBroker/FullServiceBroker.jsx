import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import host from "../../AppConfig";
import "./FullServiceBroker.css";
import AddFull from "./AddFull.jsx";

const FullServiceBroker = () => {
  const [brokers, setBanners] = useState(
    []
  );

  useEffect(() => {
    getBrokers();
  }, []);
  async function getBrokers() {
    try {
      const response = await fetch(`${host}/api/v1/visitor/fullBroker_list`, {
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
  const handleTitleChange = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      title: e.target.value,
    };
    setBanners(newBanners);
  };

  const handleLogoChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newBanners = [...brokers];
      newBanners[index] = {
        ...brokers[index],
        logo: URL.createObjectURL(file),
      };
      setBanners(newBanners);
    }
  };

  const handleTitleBody = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      body: e.target.value,
    };
    setBanners(newBanners);
  };

  const handleChargesTab = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      chargesTab: e.target.value,
    };
    setBanners(newBanners);
  };

  const handleMarginTab = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      marginTab: e.target.value,
    };
    setBanners(newBanners);
  };

  const handleURLChange = (e, index) => {
    const newBanners = [...brokers];
    newBanners[index] = {
      ...brokers[index],
      dematURL: e.target.value,
    };
    setBanners(newBanners);
  };

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
      const response = await fetch(`${host}/api/v1/visitor/delete_fullbroker/${i}`, {
        method: "GET",
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

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <div className="BannerAdminContainer">
      <Sidebar />
      <div className="BannerAdminContent">
        <h1>
          Full Service Broker
          <button className="addbtn" onClick={() => setIsPopupVisible(true)}>
            Add
          </button>
        </h1>
        {isPopupVisible && (
          <AddFull
            onClose={(v) => {
              if (v == true) {
                getBrokers();
              }
              setIsPopupVisible(false);
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
                  ? `url(${host}/full/logo-${broker.brokerId}.png)`
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
                    ? `url(${host}/full/bgImg-${broker.brokerId}.png)`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <br />
              <strong>Title: </strong>
              {broker.title ?? ""}
              {/* <input
                type="text"
                value={broker.title ?? ""}
                onChange={(e) => handleTitleChange(e, index)}
                className="txtInput"
              /> */}
              <br />
              <strong>body : </strong>
              {broker.body ?? ""}
              {/* <input
                type="text"
                value={broker.body ?? ""}
                onChange={(e) => handleURLChange(e, index)}
                className="txtInput"
              /> */}
              <br />
              <strong>chargeTab : </strong>
              {broker.chargeTab ?? ""}
              {/* <input
                type="text"
                value={broker.chargeTab ?? ""}
                onChange={(e) => handleURLChange(e, index)}
                className="txtInput"
              /> */}
              <br />
              <strong>marginTab : </strong>
              {broker.maginTab ?? ""}
              {/* <input
                type="text"
                value={broker.chargeTab ?? ""}
                onChange={(e) => handleURLChange(e, index)}
                className="txtInput"
              /> */}
              <br />
              <strong>URL : </strong>
              {broker.url ?? ""}
              {/* <input
                type="text"
                value={broker.url ?? ""}
                onChange={(e) => handleURLChange(e, index)}
                className="txtInput"
              /> */}
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
