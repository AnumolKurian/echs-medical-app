import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MemberUpdate = () => {
  const { echs_member_id } = useParams(); // Get the member ID from the URL
  const navigate = useNavigate(); // To redirect after successful update
  const [memberData, setMemberData] = useState({
    official_name: "",
    cmp_address: "",
    cmp_phone: "",
    email: "",
    gender: "",
    rank: "",
    echs_card_no: "",
    aadhar_no: "",
    bank_account_no: "",
    bank_ifsc_code: "",
    password: ""
  });

  const [error, setError] = useState(null);

  // Fetch existing member details
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`http://localhost/echs_app/getmemberbyid.php?echs_member_id=${echs_member_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch member details");
        }
        const data = await response.json();
        setMemberData({
          official_name: data.official_name,
          cmp_address: data.cmp_address,
          cmp_phone: data.cmp_phone,
          email: data.email,
          gender: data.gender,
          rank: data.rank,
          echs_card_no: data.echs_card_no,
          aadhar_no: data.aadhar_no,
          bank_account_no: data.bank_account_no,
          bank_ifsc_code: data.bank_ifsc_code,
          password: data.password,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemberDetails();
  }, [echs_member_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append values from memberData to formData
    formData.append("official_name", memberData.official_name);
    formData.append("cmp_address", memberData.cmp_address);
    formData.append("cmp_phone", memberData.cmp_phone);
    formData.append("email", memberData.email);
    formData.append("gender", memberData.gender);
    formData.append("rank", memberData.rank);
    formData.append("echs_card_no", memberData.echs_card_no);
    formData.append("aadhar_no", memberData.aadhar_no);
    formData.append("bank_account_no", memberData.bank_account_no);
    formData.append("bank_ifsc_code", memberData.bank_ifsc_code);
    formData.append("password", memberData.password);

    try {
      const response = await fetch(`http://localhost/echs_app/update_member.php?echs_member_id=${echs_member_id}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.Status) {
        alert("Member updated successfully");
        navigate("/admin/Member"); // Navigate after success
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error updating the member: " + error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Edit Member</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Official Name:</label>
          <input
            className="form-control"
            type="text"
            name="official_name"
            value={memberData.official_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            className="form-control"
            type="text"
            name="cmp_address"
            value={memberData.cmp_address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone no:</label>
          <input
            className="form-control"
            type="text"
            name="cmp_phone"
            value={memberData.cmp_phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={memberData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            className="form-control"
            type="text"
            name="gender"
            value={memberData.gender}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Rank:</label>
          <input
            className="form-control"
            type="text"
            name="rank"
            value={memberData.rank}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>ECHS CARD no:</label>
          <input
            className="form-control"
            type="text"
            name="echs_card_no"
            value={memberData.echs_card_no}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Aadhar no:</label>
          <input
            className="form-control"
            type="text"
            name="aadhar_no"
            value={memberData.aadhar_no}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Bank Account No:</label>
          <input
            className="form-control"
            type="text"
            name="bank_account_no"
            value={memberData.bank_account_no}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Bank IFSC code:</label>
          <input
            className="form-control"
            type="text"
            name="bank_ifsc_code"
            value={memberData.bank_ifsc_code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={memberData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default MemberUpdate;
