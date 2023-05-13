import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./History.scss";

export const History = () => {
  return (
    <div className="box transaction-box">
      <div className="header-container">
        <h3 className="section-header">Call History</h3>
        <div className="date-selector">
          <span>1 Jan - 1 Feb 2022</span>
        </div>
      </div>
      <table className="transaction-history">
        <tr>
          <th>Caller</th>
          <th>Date</th>
          <th>Call Duration</th>
          <th>Category</th>
        </tr>
        <tr>
          <td>Unknown number</td>
          <td>Jan 01,2022</td>
          <td>0:37:00</td>
          <td>
            <FontAwesomeIcon
              icon={icon({ name: "circle-xmark" })}
              color="red"
            />
            &nbsp;&nbsp; Spam
          </td>
        </tr>
        <tr>
          <td>Swiggy</td>
          <td>Jan 04,2022</td>
          <td>0:7:00</td>
          <td>
            <FontAwesomeIcon
              icon={icon({ name: "pizza-slice" })}
              color="#3252bc"
            />
            &nbsp;&nbsp; Food Delivery
          </td>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>Jan 06,2022</td>
          <td>0:10:00</td>
          <td>
            <FontAwesomeIcon
              icon={icon({ name: "address-book" })}
              color="green"
            />
            &nbsp;&nbsp; Known Contact
          </td>
        </tr>
      </table>
    </div>
  );
};
