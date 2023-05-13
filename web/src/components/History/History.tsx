import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./History.scss";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Link } from "@nextui-org/react";
import {
  faAddressBook,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { Message } from "../Chat/ChatMessage";

const icons = {
  "circle-xmark": faCircleXmark,
  "pizza-slice": faPizzaSlice,
  "address-book": faAddressBook,
};

interface HistoryItem {
  id: string;
  caller: string;
  date: string;
  duration: string;
  category: string;
  iconName: string;
  messages?: Message[];
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hello There",
    sender: "Caller",
  },
  {
    id: "2",
    text: "Hi There",
    sender: "Me",
  },
  {
    id: "3",
    text: "Hello, this is longer text Hello, this is longer text Hello, this is longer text Hello, this is longer text",
    sender: "Caller",
  },
  {
    id: "4",
    text: "Hello, this is longer text Hello, this is longer text Hello, this is longer text Hello, this is longer text",
    sender: "Me",
  },
];

const mockHistoryItems: HistoryItem[] = [
  {
    id: "1",
    caller: "Unknown number",
    date: "Jan 01,2023",
    duration: "0:37:00",
    category: "Spam",
    iconName: "circle-xmark",
    messages: mockMessages.slice(0, 2),
  },
  {
    id: "2",
    caller: "Swiggy",
    date: "Jan 04,2023",
    duration: "0:7:00",
    category: "Food Delivery",
    iconName: "pizza-slice",
    messages: mockMessages.slice(0, 3),
  },
  {
    id: "3",
    caller: "John Doe",
    date: "Jan 06,2023",
    duration: "0:10:00",
    category: "Known Contact",
    iconName: "address-book",
    messages: mockMessages.slice(0, 4),
  },
];

export const History = () => {
  const [chats, setChats] = React.useState<HistoryItem[]>([]);
  useEffect(() => {
    async function getChats() {
      setChats(mockHistoryItems);
      // try {
      //   const res = await fetch("http://localhost/api/get_chats");
      //   const chats = await res.json();
      //   console.log(chats);
      // } catch (error) {
      //   console.error(error);
      // }
    }
    getChats();
  });
  return (
    <div className="box transaction-box">
      <div className="header-container">
        <h3 className="section-header">Call History</h3>
        <div className="date-selector">
          <span>1 Jan - 1 Feb 2023</span>
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
                  icon={solid("circle-xmark")}
                  color={
                    historyItem.category === "Spam"
                      ? "red"
                      : historyItem.category === "Food Delivery"
                      ? "#3252bc"
                      : "green"
                  }
                />
                &nbsp;&nbsp;  */}
                {historyItem.category}
              </td>
            </tr>
          );
        })}
        {/* <tr>
          <td>Unknown number</td>
          <td>Jan 01,2023</td>
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
          <td>Jan 04,2023</td>
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
          <td>Jan 06,2023</td>
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
