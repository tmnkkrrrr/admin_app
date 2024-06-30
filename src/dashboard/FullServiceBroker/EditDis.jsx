import React, { useState, useEffect } from "react";
import TableMaker from "../Components/TableMaker";
import host from "../../AppConfig";

const EditDis = ({ onClose, brokerId }) => {
  const [formData, setFormData] = useState({
    title: "",
    logo: null,
    body: "",
    bgImg: null,
    dematURL: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [bgImgPreview, setBgImgPreview] = useState(null);
  const [marginTable, setMarginTable] = useState([]);
  const [brokerageTable, setBrokerageTable] = useState([]);
  const [chargesTable, setChargesTable] = useState([]);

  useEffect(() => {
    const fetchBrokerData = async () => {
      try {
        const response = await fetch(
          `${host}/api/v1/visitor/getBrokerData/${brokerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch broker data");
        }
        const data = await response.json();
        setFormData({
          title: data.broker.title,
          logo: data.broker.logo,
          body: data.broker.body,
          bgImg: data.broker.bgImg,
          dematURL: data.broker.dematURL,
        });
        setMarginTable(data.margin);
        setBrokerageTable(data.brokerage);
        setChargesTable(data.charges);
        // console.log(data.margin);

        if (data.broker.logo) {
          setLogoPreview(`/path/to/logo/directory/${data.broker.logo}`);
        }
        if (data.broker.bgImg) {
          setBgImgPreview(`/path/to/bgImg/directory/${data.broker.bgImg}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrokerData();
  }, [brokerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
      if (name === "logo") {
        setLogoPreview(URL.createObjectURL(file));
      } else if (name === "bgImg") {
        setBgImgPreview(URL.createObjectURL(file));
      }
    }
  };

  const marginCol = ["Segment", "MIS", "CO", "Bo"];
  const brokerageCol = ["Segment", "Value"];
  const chargesCol = ["Segment", "Value"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object to send files and other data
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("brokerId", brokerId);
    formDataToSend.append("body", formData.body);
    formDataToSend.append("dematURL", formData.dematURL);
    if (formData.logo) formDataToSend.append("logo", formData.logo);
    if (formData.bgImg) formDataToSend.append("bgImg", formData.bgImg);
    console.log(marginTable);
    formDataToSend.append("marginTable", JSON.stringify(marginTable));
    formDataToSend.append("brokerageTable", JSON.stringify(brokerageTable));
    formDataToSend.append("chargesTable", JSON.stringify(chargesTable));

    try {
      const response = await fetch(`${host}/api/v1/visitor/editDisBroker`, {
        method: "POST",
        body: formDataToSend,
      });

      
      if(response.status === 200){
        alert("Broker Updated Successfully")
        onClose();
      }
      if(response.status === 400){
        alert("SOme Fields are Empty, Please Check!!")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Broker</h2>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <TableMaker
            heading={"Charges"}
            columnNames={chargesCol}
            onTableDataChange={setChargesTable}
            initialData={chargesTable}
          />
          <TableMaker
            heading={"Brokerage"}
            columnNames={brokerageCol}
            onTableDataChange={setBrokerageTable}
            initialData={brokerageTable}
          />
          <TableMaker
            heading={"Margin"}
            columnNames={marginCol}
            onTableDataChange={setMarginTable}
            initialData={marginTable}
          />
          <label>
            Logo:
            <input type="file" name="logo" onChange={handleImageChange} />
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                style={{ width: "200px", height:'200px', marginTop: "10px" }}
              />
            )}
          </label>
          <br />
          <label>
            Body:
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Background Image:
            <input type="file" name="bgImg" onChange={handleImageChange} />
            {bgImgPreview && (
              <img
                src={bgImgPreview}
                alt="Background Image Preview"
                style={{ width: "500px",height:"250px", marginTop: "10px" }}
              />
            )}
          </label>
          <label>
            Demat URL:
            <input
              type="text"
              name="dematURL"
              value={formData.dematURL}
              onChange={handleInputChange}
            />
          </label>
          <div className="popup-buttons">
            <button type="submit" onClick={handleSubmit}>Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditDis;
