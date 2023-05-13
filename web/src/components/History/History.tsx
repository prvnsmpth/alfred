import React from "react";
import './History.scss';

export const History = () => {
  return (
    <div className="box transaction-box">
      <div className="header-container">
        <h3 className="section-header">Call History</h3>
        <div className="date-selector">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1.5V3.75"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 1.5V3.75"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.625 6.8175H15.375"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.7713 10.275H11.778"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.7713 12.525H11.778"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.99686 10.275H9.00359"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.99686 12.525H9.00359"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.22049 10.275H6.22723"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.22049 12.525H6.22723"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>1 Jan - 1 Feb 2022</span>
        </div>
      </div>
      <table className="transaction-history">
        <tr>
          <th>Caller</th>
          <th>
            Date
          </th>
          <th>
            Call Duration
          </th>
          <th>
            Status
          </th>
        </tr>
        <tr>
          <td>
            Unknown number
          </td>
          <td>Jan 01,2022</td>
          <td>0:37:00</td>
          <td>
            <svg
              className="status"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="16"
                height="16"
                rx="8"
                fill="#BCE455"
                fill-opacity="0.3"
              />
              <circle cx="8" cy="8" r="4" fill="#7FB519" />
            </svg>
            Completed
          </td>
        </tr>
        <tr>
          <td>
            Swiggy
          </td>
          <td>Jan 04,2022</td>
          <td>0:7:00</td>
          <td>
            <svg
              className="status"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="16"
                height="16"
                rx="8"
                fill="#DBA32A"
                fill-opacity="0.14"
              />
              <circle cx="8" cy="8" r="4" fill="#DBA32A" />
            </svg>
            Pending
          </td>
        </tr>
        <tr>
          <td>
            John Doe
          </td>
          <td>Jan 06,2022</td>
          <td>0:10:00</td>
          <td>
            <svg
              className="status"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="16"
                height="16"
                rx="8"
                fill="#DB2719"
                fill-opacity="0.3"
              />
              <circle cx="8" cy="8" r="4" fill="#DB2719" />
            </svg>
            On Hold
          </td>
        </tr>
      </table>
    </div>
  );
};
