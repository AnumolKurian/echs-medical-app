import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowUserSingleBill = () => {
  const { echs_member_id } = useParams(); // Get the echs_member_id from the URL

  const [memberData, setMemberData] = useState({
    official_name: "",
    echs_card_no: "",
    bill_month: "",
    bill_year: "",
    bank_ifsc_code: "",
    bank_account_no: "",
    aadhar_no: "",
    bills: [], // Initialize an empty array for bills
    total_amount: 0, // Initialize total_amount as 0
  });

  const [error, setError] = useState(null);

  // Fetch the member details and bill items
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost/echs_app/getsingleuserbill.php?echs_member_id=${echs_member_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch member details");
        }

        const data = await response.json();
        console.log("Received data:", data); // Log the entire response

        if (data && Array.isArray(data.bills)) {
          console.log("Bills array:", data.bills); // Log the bills array

          // Check if the member data contains bills
          if (data.bills.length > 0) {
            setMemberData({
              official_name: data.official_name,
              echs_card_no: data.echs_card_no,
              bill_month: data.bill_month,
              bill_year: data.bill_year,
              bank_ifsc_code: data.bank_ifsc_code,
              bank_account_no: data.bank_account_no,
              aadhar_no: data.aadhar_no,
              bills: data.bills, // Set the bills directly
              total_amount: data.total_amount, // Use total_amount from the API response
            });
          } else {
            setError("No bills found for this member.");
          }
        } else {
          setError("No bills data found or data format is incorrect.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchMemberDetails();
  }, [echs_member_id]); // The dependency array ensures re-fetching when echs_member_id changes

  // Error handling and rendering
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Single User Bill Details</h1>
      <form>
        <div>
          <label>Official Name:</label>
          <input
            className="form-control"
            type="text"
            name="official_name"
            value={memberData.official_name || ""}
            readOnly
          />
        </div>
        <div>
          <label>ECHS Card No:</label>
          <input
            className="form-control"
            type="text"
            name="echs_card_no"
            value={memberData.echs_card_no || ""}
            readOnly
          />
        </div>
        <div>
          <label>Bank Account No:</label>
          <input
            className="form-control"
            type="text"
            name="bank_account_no"
            value={memberData.bank_account_no || ""}
            readOnly
          />
        </div>
        <div>
          <label>IFSC Code:</label>
          <input
            className="form-control"
            type="text"
            name="bank_ifsc_code"
            value={memberData.bank_ifsc_code || ""}
            readOnly
          />
        </div>
        <div>
          <label>Aadhar No:</label>
          <input
            className="form-control"
            type="text"
            name="aadhar_no"
            value={memberData.aadhar_no || ""}
            readOnly
          />
        </div>

        <h3>Bill Details</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Bill Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {memberData.bills.length > 0 ? (
              memberData.bills.map((bill, index) => (
                <tr key={index}>
                  <td>{bill.billNo}</td> {/* Ensure this matches your API's field name */}
                  <td>{bill.billDate}</td> {/* Ensure this matches your API's field name */}
                  <td>{bill.amount}</td> {/* Ensure this matches your API's field name */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No bills found</td>
              </tr>
            )}
          </tbody>
        </table>

        <h4>Total Amount: {memberData.total_amount}</h4>
      </form>
    </div>
  );
};

export default ShowUserSingleBill;
