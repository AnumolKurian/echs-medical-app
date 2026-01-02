import React, { useState } from "react";

function MemberView() {
  const [formData, setFormData] = useState({
    Echsmember_id: "",
    Official_name: "",
    Address: "",
    Phone: "",
    Email: "",
    Gender: "",
    Rank: "",
    Echscard_no: "",
    Aadhar_no: "",
    Bank_account_no: "",
    Bank_ifsc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add further logic to handle form submission, e.g., API calls
  };

  return (
    <div className="card-body">
      <div className="class-header">
        <h1>Registration</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ECHS Member ID</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Echsmember_id"
            value={formData.Echsmember_id}
          />
        </div>
        <div className="form-group">
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
          <label>Address</label>
          <textarea
            onChange={handleChange}
            className="form-control"
            name="Address"
            value={formData.Address}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Phone"
            value={formData.Phone}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            name="Email"
            value={formData.Email}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Gender"
            value={formData.Gender}
          />
        </div>
        <div className="form-group">
          <label>Rank</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Rank"
            value={formData.Rank}
          />
        </div>
        <div className="form-group">
          <label>ECHS Card No</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Echscard_no"
            value={formData.Echscard_no}
          />
        </div>
        <div className="form-group">
          <label>Aadhar No</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Aadhar_no"
            value={formData.Aadhar_no}
          />
        </div>
        <div className="form-group">
          <label>Bank Account No</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Bank_account_no"
            value={formData.Bank_account_no}
          />
        </div>
        <div className="form-group">
          <label>Bank IFSC</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="Bank_ifsc"
            value={formData.Bank_ifsc}
          />
        </div>
        <div className="form-group pt-2">
          <button type="submit" className="btn btn-primary">
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default MemberView;
