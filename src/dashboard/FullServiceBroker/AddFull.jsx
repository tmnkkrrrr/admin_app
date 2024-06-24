import React, { useState } from "react";
import "./AddDis.css";
import host from "../../AppConfig";

const AddFull = ({ onClose }) => {
  const initialState = {
    title: "",
    logo: null,
    body: "",
    bgImg: null,
    dematURL: "",
  };

  const [newField, setNewField] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewField({
        ...newField,
        [name]: files[0],
      });
    } else {
      setNewField({
        ...newField,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newField).forEach((key) => {
      formData.append(key, newField[key]);
    });

    try {
      const response = await fetch(`${host}/api/v1/visitor/fullBroker`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      onClose(true);
    } catch (error) {
      alert("Could Not Add Broker");
      console.error("Error:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add New Broker</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newField.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Logo:
            <input type="file" name="logo" onChange={handleChange} />
          </label>
          <label>
            Body:
            <textarea
              name="body"
              value={newField.body}
              onChange={handleChange}
            />
          </label>
          <label>
            Background Image:
            <input type="file" name="bgImg" onChange={handleChange} />
          </label>
          <label>
            Demat URL:
            <input
              type="text"
              name="dematURL"
              value={newField.dematURL}
              onChange={handleChange}
            />
          </label>
          <div className="popup-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFull;
