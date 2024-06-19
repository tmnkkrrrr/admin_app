import React, { useState, useEffect } from "react";

const TableMaker = ({ heading, columnNames, onTableDataChange }) => {
  const [rows, setRows] = useState([Array(columnNames.length).fill("")]);

  useEffect(() => {
    onTableDataChange(rows);
  }, [rows, onTableDataChange]);

  const handleChange = (e, rowIndex, colIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex] = e.target.value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, Array(columnNames.length).fill("")]);
  };

  const handleRemoveRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };

  return (
    <div>
      <strong>{heading}</strong>
      <table>
        <thead>
          <tr>
            {columnNames.map((colName, index) => (
              <th key={index}>{colName}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleChange(e, rowIndex, colIndex)}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleRemoveRow(rowIndex)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default TableMaker;
