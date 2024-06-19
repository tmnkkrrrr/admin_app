import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Banner.css";
import host from "../../AppConfig";

const Banner = () => {
  const [banners, setBanners] = useState(
    Array(10).fill({
      img: null,
      im: null,
      title: "ile",
      url: "url",
      path: null,
    })
  );

  useEffect(() => {
    async function getBanners() {
      try {
        const response = await fetch(
          `${host}/api/v1/visitor/get_admin_banners`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBanners([...data]);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }
    getBanners();
  }, []);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newBanners = [...banners];
      newBanners[index] = {
        ...banners[index],
        img: URL.createObjectURL(file),
        im: file,
      };
      setBanners(newBanners);
    }
  };

  const handleTitleChange = (e, index) => {
    const newBanners = [...banners];
    newBanners[index] = {
      ...banners[index],
      title: e.target.value,
    };
    setBanners(newBanners);
  };

  const handleURLChange = (e, index) => {
    const newBanners = [...banners];
    newBanners[index] = {
      ...banners[index],
      url: e.target.value,
    };
    setBanners(newBanners);
  };

  const saveImg = async (i) => {
    try {
      const formData = new FormData();
      formData.append("banner_no", i + 1);
      formData.append("title", banners[i].title);
      formData.append("url", banners[i].url);
      formData.append("image", banners[i].im);
      console.log(banners[i]);

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

  return (
    <div className="BannerAdminContainer">
      <Sidebar />
      <div className="BannerAdminContent">
        <h1>Banner Management</h1>
        <p>
          Aspect Ratio &rarr; width/height = 2:1
          <br />
          Min. Image Size &rarr; width/height = 260/130px
        </p>
        <br />

        <div className="BannerGrid">
          {banners.map((banner, index) => (
            <div className="img_box" key={index}>
              <div
                className="BannerItem"
                style={{
                  backgroundImage: banner.path
                    ? `url(${host}/banner/${banner.path})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="imgInput"
                  style={{opacity:0}}
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
              <br />
              <strong>Title:</strong>
              <input
                type="text"
                value={banner.title ?? ""}
                onChange={(e) => handleTitleChange(e, index)}
                className="txtInput"
              />
              <br />
              <strong>URL:</strong>
              <input
                type="text"
                value={banner.url ?? ""}
                onChange={(e) => handleURLChange(e, index)}
                className="txtInput"
              />
              <br />
              <br />
              <button onClick={() => saveImg(index)}>Save</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
