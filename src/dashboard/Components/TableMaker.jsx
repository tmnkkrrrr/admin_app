import React, { useState, useEffect } from "react";

const TableMaker = ({ heading, columnNames, onTableDataChange, initialData = [] }) => {
  const [rows, setRows] = useState(initialData.length > 0 ? initialData : []);

  useEffect(() => {
    if (initialData.length > 0) {
      setRows(initialData);
    }
  }, [initialData, heading]);

  useEffect(() => {
    onTableDataChange(rows);
  }, [rows, onTableDataChange]);

  const handleChange = (e, rowIndex, colIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex] = e.target.value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = columnNames.reduce((acc, colName) => {
      acc[colName.toLowerCase()] = "";
      return acc;
    }, {});
    console.log(newRow);
    setRows([...rows, newRow]);
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
             {columnNames.map((colName, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[colName.toLowerCase()]}
                    onChange={(e) => handleChange(e, rowIndex, colName.toLowerCase())}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => { handleRemoveRow(rowIndex)}}>Remove</button>
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
