import React from "react";
import "./App.scss";
import { Chat } from "./components/Chat/Chat";
import { History } from "./components/History/History";
import { Chat2 } from "./components/Chat2/Chat2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Settings } from "./components/Settings/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Home } from "./components/Home/Home";
import { ChatDetails } from "./components/ChatDetails/ChatDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/history/:id",
    element: <ChatDetails />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  const currentPath = window.location.pathname;
  return (
    <div className="App">
      {/* <Chat /> */}
      {/* <Chat2 /> */}
      <div className="outer-container">
        <div className="container">
          <div className="sidebar">
            <a href="#" className="sidebar__logo-wrapper">
              <h1 className="sidebar__logo">S</h1>
              <h1 className="sidebar__logo-text">Alfred</h1>
            </a>
            {/* <h3 className="sidebar__title">MENU</h3> */}
            <ul className="sidebar__menu">
              <li className="sidebar__item">
                <a
                  href="/"
                  className={`sidebar__link ${
                    currentPath === "/" ? "is-active" : ""
                  }`}
                >
                  <span className="sidebar__icon">
                    <svg
                      className="sidebar__svg-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"></path>
                    </svg>
                  </span>
                  <span className="sidebar__item-text">Home</span>
                </a>
              </li>
              <li className="sidebar__item">
                <a
                  href="/chat"
                  className={`sidebar__link ${
                    currentPath === "/chat" ? "is-active" : ""
                  }`}
                >
                  <span className="sidebar__icon">
                    <FontAwesomeIcon
                      className="sidebar__svg-icon"
                      icon={icon({ name: "phone" })}
                    />
                  </span>
                  <span className="sidebar__item-text">Live Call</span>
                </a>
              </li>
              <li className="sidebar__item">
                <a
                  href="/history"
                  className={`sidebar__link ${
                    currentPath.includes("/history") ? "is-active" : ""
                  }`}
                >
                  <span className="sidebar__icon">
                    <FontAwesomeIcon
                      className="sidebar__svg-icon"
                      icon={icon({ name: "sheet-plastic" })}
                    />
                  </span>
                  <span className="sidebar__item-text">History</span>
                </a>
              </li>
              <li className="sidebar__item">
                <a
                  href="/settings"
                  className={`sidebar__link ${
                    currentPath === "/settings" ? "is-active" : ""
                  }`}
                >
                  <span className="sidebar__icon">
                    <FontAwesomeIcon
                      className="sidebar__svg-icon"
                      icon={icon({ name: "gear" })}
                    />
                  </span>
                  <span className="sidebar__item-text">Settings</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="main-wrapper">
            <div className="topbar">
              <div className="topbar__search">
                <input
                  className="topbar__input "
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className="topbar__user-wrapper">
                <div className="topbar__user">
                  <img
                    src="https://www.pngitem.com/pimgs/m/627-6275754_chad-profile-pic-profile-photo-circle-png-transparent.png"
                    alt="user"
                    className="topbar__user"
                  />
                </div>
                <div className="topbar__notif">
                  <FontAwesomeIcon
                    className="topbar__notif-svg feather feather-bell"
                    icon={icon({ name: "bell" })}
                    color="white"
                  />
                </div>
              </div>
            </div>
            <div className="content">
              <RouterProvider router={router} />
            </div>
            <ul className="navbar">
              <li className="navbar__item">
                <a href="" className="navbar__link">
                  <svg
                    className="navbar__icon css-i6dzq1"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Discover
                </a>
              </li>
              <li className="navbar__item">
                <a href="" className="navbar__link">
                  <svg
                    className="navbar__icon css-i6dzq1"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>
                  Browser
                </a>
              </li>
              <li className="navbar__item">
                <a href="" className="navbar__link">
                  <svg
                    className="navbar__icon css-i6dzq1"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Bookmark
                </a>
              </li>
              <li className="navbar__item">
                <a href="" className="navbar__link">
                  <svg
                    className="navbar__icon css-i6dzq1"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  More
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
