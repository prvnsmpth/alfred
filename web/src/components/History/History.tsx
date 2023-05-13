import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./History.scss";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Link } from "@nextui-org/react";

const icons = {
  "circle-xmark": icon({ name: "circle-xmark" }),
  "pizza-slice": icon({ name: "pizza-slice" }),
  "address-book": icon({ name: "address-book" }),
};

interface HistoryItem {
  id: string;
  caller: string;
  date: string;
  duration: string;
  category: string;
  iconName: string;
}

const mockHistoryItems: HistoryItem[] = [
  {
    id: "1",
    caller: "Unknown number",
    date: "Jan 01,2022",
    duration: "0:37:00",
    category: "Spam",
    iconName: "circle-xmark",
  },
  {
    id: "2",
    caller: "Swiggy",
    date: "Jan 04,2022",
    duration: "0:7:00",
    category: "Food Delivery",
    iconName: "pizza-slice",
  },
  {
    id: "3",
    caller: "John Doe",
    date: "Jan 06,2022",
    duration: "0:10:00",
    category: "Known Contact",
    iconName: "address-book",
  },
];

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
        {mockHistoryItems.map((historyItem: HistoryItem) => {
          const i = { name: "circle-xmark" };
          return (
            <tr key={historyItem.id}>
              <td>
                <Link href={`/history/${historyItem.id}`}>
                  {historyItem.caller}
                </Link>
              </td>
              <td>{historyItem.date}</td>
              <td>{historyItem.duration}</td>
              <td>
                {/* <FontAwesomeIcon
                  icon={icon({ name: "circle-xmark" })}
                  color={
                    historyItem.category === "Spam"
                      ? "red"
                      : historyItem.category === "Food Delivery"
                      ? "#3252bc"
                      : "green"
                  }
                /> */}
                &nbsp;&nbsp; {historyItem.category}
              </td>
            </tr>
          );
        })}
        {/* <tr>
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
        </tr> */}
      </table>
    </div>
  );
};
