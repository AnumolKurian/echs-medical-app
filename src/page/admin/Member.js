import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import "./GetAll.css";

const Member = () => {
  const [cmember, setGetAllMember] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const getAllMember = () => {
    fetch("http://localhost/echs_app/getallmember.php")
      .then((result) => result.json())
      .then((responds) => {
        setGetAllMember(responds);
      });
  };

  useEffect(() => {
    getAllMember();
  }, []);

  const save_member = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    // Validation for full name
    

    

    // Check if password already exists
    

    const data = new FormData();
    data.append("official_name", formData.official_name);
    data.append("cmp_address", formData.cmp_address);
    data.append("cmp_phone", formData.cmp_phone);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("rank", formData.rank);
    data.append("echs_card_no", formData.echs_card_no);
    data.append("aadhar_no", formData.aadhar_no);
    data.append("bank_account_no", formData.bank_account_no);
    data.append("bank_ifsc_code", formData.bank_ifsc_code);
    data.append("password", formData.password);


    fetch("http://localhost/echs_app/save_member.php", {
      method: "POST",
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status) {
          alert("member successfully saved");
          setFormData({}); // Clear the form
          getAllMember(); // Refresh staff list
        } else {
          alert(data.Message);
        }
      });
  };

  const handle_change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const delete_member = (echs_member_id, email) => {
    fetch(
      `http://localhost/echs_app/delete_member.php?echs_member_id=${echs_member_id}&email=${email}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.Status === "true") {
          alert("Staff successfully deleted");
          setGetAllMember((prevList) =>
            prevList.filter((item) => item.echs_member_id !== echs_member_id)
          );
        } else {
          alert(data.Message);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to delete staff. Please try again.");
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: "100vh" }}>
          {/* Left Side - Table */}
          <div className="col-6 d-flex flex-column">
            <h2 className="text-center mb-4">Member List</h2>
            <div className="table-container flex-grow-1 overflow-auto">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Official Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Rank</th>
                    <th>echs_card_no</th>
                    <th>aadhar_no</th>
                    <th>bank_account_no</th>
                    <th>bank_ifsc_code</th>
                    <th>Action</th>
                    <th>Action</th>
                  
                    
                  </tr>
                </thead>
                <tbody>
                  {cmember.map((item, index) => (
                    <tr key={item.echs_member_id}>
                      <td>{index + 1}</td>
                      <td>{item.official_name}</td>
                      <td>{item.cmp_address}</td>
                      <td>{item.cmp_phone}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                      <td>{item.rank}</td>
                      <td>{item.echs_card_no}</td>
                      <td>{item.aadhar_no}</td>
                      <td>{item.bank_account_no}</td>
                      <td>{item.bank_ifsc_code}</td>
                      <td>
                        <button onClick={() => {
                            delete_member(item.echs_member_id, item.email);
                       }}>                         
                        
                          Delete
                        </button></td>
                        <td>
                          <Link to={`/MemberUpdate/${item.echs_member_id}`}>
                          <button className="btn btn-primary">EDIT</button>
                        </Link></td>
                      
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-6 d-flex flex-column">
            <h2 className="text-center mb-4">Add New member</h2>
            <form onSubmit={save_member}>
              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <div className="form-group mb-3">
                <label>Official Name </label>
                <input
                  onChange={handle_change}
                  value={formData.official_name || ""}
                  type="text"
                  className="form-control"
                  name="official_name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Address </label>
                <textarea
                  onChange={handle_change}
                  value={formData.cmp_address || ""}
                  className="form-control"
                  name="cmp_address"
                  rows="3"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Phone Number </label>
                <input
                  onChange={handle_change}
                  value={formData.cmp_phone || ""}
                  type="text"
                  className="form-control"
                  name="cmp_phone"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Email Id </label>
                <input
                  onChange={handle_change}
                  value={formData.email || ""}
                  type="email"
                  className="form-control"
                  name="email"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>gender </label>
                <input
                  onChange={handle_change}
                  value={formData.gender || ""}
                  type="text"
                  className="form-control"
                  name="gender"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Rank </label>
                <input
                  onChange={handle_change}
                  value={formData.rank || ""}
                  type="text"
                  className="form-control"
                  name="rank"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>ECHS Card No </label>
                <input
                  onChange={handle_change}
                  value={formData.echs_card_no || ""}
                  type="text"
                  className="form-control"
                  name="echs_card_no"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>aadhar_no </label>
                <input
                  onChange={handle_change}
                  value={formData.aadhar_no || ""}
                  type="text"
                  className="form-control"
                  name="aadhar_no"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>bank_account_no </label>
                <input
                  onChange={handle_change}
                  value={formData.bank_account_no || ""}
                  type="text"
                  className="form-control"
                  name="bank_account_no"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Bank IFSC code </label>
                <input
                  onChange={handle_change}
                  value={formData.bank_ifsc_code || ""}
                  type="text"
                  className="form-control"
                  name="bank_ifsc_code"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password </label>
                <input
                  onChange={handle_change}
                  value={formData.password || ""}
                  type="password"
                  className="form-control"
                  name="password"
                  required
                />
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;