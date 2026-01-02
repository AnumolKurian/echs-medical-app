import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const MedicalBill = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");
  const { echs_member_id } = useParams(); // Get echs_member_id from the URL
  const [cbill, setGetAllBill] = useState([]);

  const getAllBill = useCallback(() => {
    fetch(
      `http://localhost/echs_app/getalluserbill.php?username=${username}&echs_member_id=${echs_member_id}`
    )
      .then((result) => result.json())
      .then((responds) => {
        setGetAllBill(responds);
      });
  }, [username, echs_member_id]);

  useEffect(() => {
    getAllBill();
  }, [getAllBill]);

  return (
    <>
      <div className="container-fluid">
        <h2 className="text-center mb-4">All User Bills</h2>
        <div className="table-container flex-grow-1 overflow-auto">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Created Date</th>
                <th>Year</th>
                <th> Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cbill.map((item, index) => (
                <tr key={item.mbill_id}>
                  <td>{index + 1}</td>
                  
                  <td>{item.created_date}</td>
                  <td>{item.bill_year}</td>
                  <td>{item.bill_month}</td>
                  <td>{item.total_amount}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/medicalbillview/${item.fk_echs_member_id}`}>
                      <button className="btn btn-primary">Show Bill</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedicalBill;
