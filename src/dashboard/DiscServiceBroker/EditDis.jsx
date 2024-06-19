import React, { useState, useEffect } from "react";
import TableMaker from "../Components/TableMaker";
import host from "../../AppConfig";

const EditDis = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    logo: null,
    body: "",
    bgImg: null,
    dematURL: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [bgImgPreview, setBgImgPreview] = useState(null);

  // Set initial state with the received data
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        logo: initialData.logo || null,
        body: initialData.body || "",
        bgImg: initialData.bgImg || null,
        dematURL: initialData.dematURL || "",
      });
      if (initialData.logo) {
        setLogoPreview(URL.createObjectURL(initialData.logo));
      }
      if (initialData.bgImg) {
        setBgImgPreview(URL.createObjectURL(initialData.bgImg));
      }
    }
  }, [initialData]);

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
      if (name === 'logo') {
        setLogoPreview(URL.createObjectURL(file));
      } else if (name === 'bgImg') {
        setBgImgPreview(URL.createObjectURL(file));
      }
    }
  }
         

  const marginCol = ["Segment", "MIS", "CO", "Bo"];
  const [marginTable, MarginTable] = useState([]);

  const brokrageCol = ["Segment", "Value"];
  const [brokerageTable, BrokrageTable] = useState([]);

  const chargesCol = ["Segment", "Value"];
  const [chargesTable, ChargesTable] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send files and other data
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('body', formData.body);
    formDataToSend.append('dematURL', formData.dematURL);
    if (formData.logo) formDataToSend.append('logo', formData.logo);
    if (formData.bgImg) formDataToSend.append('bgImg', formData.bgImg);
    formDataToSend.append('marginTable', JSON.stringify(marginTable));
    formDataToSend.append('brokerageTable', JSON.stringify(brokerageTable));
    formDataToSend.append('chargesTable', JSON.stringify(chargesTable));

    try {
      const response = await fetch(`${host}/api/v1/visitor/editDisBroker`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Broker</h2>
        <form onSubmit={handleSubmit}>
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
            onTableDataChange={(data) => ChargesTable(data)}
          />
          <TableMaker
            heading={"Brokrage"}
            columnNames={brokrageCol}
            onTableDataChange={(data) =>{BrokrageTable(data)}}
          />
          <TableMaker
            heading={"Margin"}
            columnNames={marginCol}
            onTableDataChange={(data) => MarginTable(data)}
          />

          <label>
            Logo:
            <input type="file" name="logo"  onChange={handleImageChange} />
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Background Preview"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
          </label>
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
            <input type="file" name="bgImg"  onChange={handleImageChange} />
            {bgImgPreview && (
              <img
                src={bgImgPreview}
                alt="Background Preview"
                style={{ width: "100%", marginTop: "10px" }}
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
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDis;
