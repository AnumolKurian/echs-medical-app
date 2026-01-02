import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const NewMedicalBill = () => {
  //const { echs_member_id } = useParams(); 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');  
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [rows, setRows] = useState([]); // Table data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billNo, setBillNo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [amount, setAmount] = useState('');

  // Open modal to add a new row
  const handleAddRowClick = () => {
    setBillNo('');
    setBillDate('');
    setAmount('');
    setIsModalOpen(true);
  };

  // Save the entered details from the modal to the table
  const handleSaveRow = () => {
    if (billNo && billDate && amount) {
      setRows([...rows, { billNo, billDate, amount }]);
      setIsModalOpen(false);
    } else {
      alert('Please fill out all fields');
    }
  };

  // Save all rows to the database
  const handleSaveToDatabase = () => {
    if (!year || !month) {
      alert('Please enter Year and Month');
      return;
    }
    if (rows.length === 0) {
      alert('Please add at least one bill');
      return;
    }
  
    //const echsMemberId = 1; // Replace with dynamic ID if needed
    const formData = {
      year,
      month,
      bills: rows,
    };
  
    axios
      .post(`http://localhost/echs_app/SaveNewUserBill.php?username=${username}`, formData)
      
      .then((response) => {
        
        if (response.data.status === 'success') {
          alert('Bills saved successfully');
          setYear('');
          setMonth('');
          setRows([]);
        } else {
          alert('Failed to save bills: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error saving bills:', error);
        alert('An error occurred while saving the bills.');
      });
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Monthly Bills</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="yearInput">Year</label>
          <input
            type="number"
            id="yearInput"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter Year"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="monthInput">Month</label>
          <input
            type="number"
            id="monthInput"
            className="form-control"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Enter Month (1-12)"
          />
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Bill Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.billNo}</td>
              <td>{row.billDate}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-info mb-3" onClick={handleAddRowClick}>
        Add Row
      </button>
      <button className="btn btn-success" onClick={handleSaveToDatabase}>
        Save
      </button>

      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Bill</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Bill No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={billNo}
                    onChange={(e) => setBillNo(e.target.value)}
                    placeholder="Enter Bill No"
                  />
                </div>
                <div className="form-group">
                  <label>Bill Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={billDate}
                    onChange={(e) => setBillDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveRow}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMedicalBill;
