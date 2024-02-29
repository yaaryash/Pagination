import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = await response.json();
      setData(result);
      setTotalPages(Math.ceil(result.length / 10));
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, data.length);

  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <h1>Employee Data Table</h1>
      <div className="pagination-container">
        <table className="pagination-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-buttons">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="green-button"
          >
            Previous
          </button>
          <span className="page-number">{currentPage}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="green-button"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
