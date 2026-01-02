import React, { useState } from 'react';

const ShowBill = () => {

  const [formData, setFormData] = useState({
    Official_name: '',
    Echs_card_no: '',
    month: '',
    year: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="card-body">
        <div className="class-header">
          <h1>SHOW BILL</h1>
        </div>
        <form>
          <div className="card-body">
            <label>Official Name</label>
            <input 
              onChange={handleChange}
              type="text"
              className="form-control"
              name="Official_name"
              value={formData.Official_name}
            />
          </div>

          <div className="form-group">
            <label>Echs Card No</label>
            <input 
              onChange={handleChange}
              type="text"
              className="form-control"
              name="Echs_card_no"
              value={formData.Echs_card_no}
            />
          </div>

          <div className="form-group">
            <label>Month</label>
            <input 
              onChange={handleChange}
              type="text"
              className="form-control"
              name="month"
              value={formData.month}
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input 
              onChange={handleChange}
              type="number" // Should be type="number" for year
              className="form-control"
              name="year"
              value={formData.year}
            />
          </div>

          <div className="form-group pt-2">
            <input 
              type="submit"
              className="btn btn-primary"
              value="Register Now"
            />
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              {/* Add any other content or cards if necessary */}
            </div>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>BILL NO</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {/* Example of a data row */}
                <tr>
                  <td>001</td>
                  <td>2024-12-18</td>
                  <td>$500</td>
                  <td>
                    <button className="btn btn-danger">Total Amount</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBill;
