import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Banner.css";

const Banner = () => {
  const [banners, setBanners] = useState(Array(10).fill(null));

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newBanners = [...banners];
      newBanners[index] = URL.createObjectURL(file);
      setBanners(newBanners);
    }
  };

  return (
    <div className="BannerAdminContainer">
  <Sidebar />
  <div className="BannerAdminContent">
    <div className="TitleBox">
      <img src="your_image_url_here" alt="Title Image" className="TitleImage" />
      <h1>Banner Management</h1>
      <p>Upload and manage banner images</p>
    </div>
    <div className="BannerGrid">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="BannerItem"
          style={{
            backgroundImage: banner ? `url(${banner})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          
          <input
            type="file"
            accept="image/*"
            style={{ opacity: 0 }}
            onChange={(e) => handleFileChange(e, index)}
          />
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Banner;
