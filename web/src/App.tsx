import React from "react";
import "./App.scss";
import { Chat } from "./components/Chat/Chat";
import { Chat2 } from "./components/Chat2/Chat2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  },
  {
    path: "/chat",
    element: <Chat />,
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
                <a href="/chat" className={`sidebar__link ${
                    currentPath === "/chat" ? "is-active" : ""
                  }`}>
                  <span className="sidebar__icon">
                    <svg
                      viewBox="0 0 24 24"
                      className="sidebar__svg-icon"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.835 12.007l.002.354c.012 1.404.096 2.657.242 3.451 0 .015.16.802.261 1.064.16.38.447.701.809.905a2 2 0 00.91.219c.249-.012.66-.137.954-.242l.244-.094c1.617-.642 4.707-2.74 5.891-4.024l.087-.09.39-.42c.245-.322.375-.715.375-1.138 0-.379-.116-.758-.347-1.064-.07-.099-.18-.226-.28-.334l-.379-.397c-1.305-1.321-4.129-3.175-5.593-3.79 0-.013-.91-.393-1.343-.407h-.057c-.665 0-1.286.379-1.603.991-.087.168-.17.496-.233.784l-.114.544c-.13.874-.216 2.216-.216 3.688zm-6.332-1.525C3.673 10.482 3 11.162 3 12a1.51 1.51 0 001.503 1.518l3.7-.328c.65 0 1.179-.532 1.179-1.19 0-.658-.528-1.191-1.18-1.191l-3.699-.327z"
                      ></path>
                    </svg>
                  </span>
                  <span className="sidebar__item-text">Live Call</span>
                </a>
              </li>
              <li className="sidebar__item">
                <a href="" className="sidebar__link">
                  <span className="sidebar__icon">
                    <svg
                      viewBox="0 0 24 24"
                      className="sidebar__svg-icon"
                      fill="currentColor"
                    >
                      <path d="M11.23 7.29V3.283c0-.427.34-.782.77-.782.385 0 .711.298.763.677l.007.104v4.01h4.78c2.38 0 4.335 1.949 4.445 4.38l.005.215v5.04c0 2.447-1.887 4.456-4.232 4.569l-.208.005H6.44c-2.38 0-4.326-1.94-4.435-4.379L2 16.905v-5.03c0-2.447 1.878-4.466 4.222-4.58l.208-.004h4.8v6.402l-1.6-1.652a.755.755 0 00-1.09 0 .81.81 0 00-.22.568c0 .157.045.32.14.459l.08.099 2.91 3.015c.14.155.34.237.55.237a.735.735 0 00.465-.166l.075-.071 2.91-3.015c.3-.31.3-.816 0-1.126a.755.755 0 00-1.004-.077l-.086.077-1.59 1.652V7.291h-1.54z"></path>
                    </svg>
                  </span>
                  <span className="sidebar__item-text">History</span>
                </a>
              </li>
              <li className="sidebar__item">
                <a href="" className="sidebar__link">
                  <span className="sidebar__icon">
                    <svg
                      viewBox="0 0 24 24"
                      className="sidebar__svg-icon"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.1535 16.64L14.995 13.77C15.2822 13.47 15.2822 13 14.9851 12.71C14.698 12.42 14.2327 12.42 13.9455 12.71L12.3713 14.31V9.49C12.3713 9.07 12.0446 8.74 11.6386 8.74C11.2327 8.74 10.896 9.07 10.896 9.49V14.31L9.32178 12.71C9.03465 12.42 8.56931 12.42 8.28218 12.71C7.99505 13 7.99505 13.47 8.28218 13.77L11.1139 16.64C11.1832 16.71 11.2624 16.76 11.3515 16.8C11.4406 16.84 11.5396 16.86 11.6386 16.86C11.7376 16.86 11.8267 16.84 11.9158 16.8C12.005 16.76 12.0842 16.71 12.1535 16.64ZM19.3282 9.02561C19.5609 9.02292 19.8143 9.02 20.0446 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5 22 16.0446 22H8.17327C5.58911 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.4901 2 7.96535 2H13.2525C13.5 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.1931 9.01 17.0149 9.02C17.4333 9.02 17.8077 9.02318 18.1346 9.02595C18.3878 9.02809 18.6125 9.03 18.8069 9.03C18.9479 9.03 19.1306 9.02789 19.3282 9.02561ZM19.6045 7.5661C18.7916 7.5691 17.8322 7.5661 17.1421 7.5591C16.047 7.5591 15.145 6.6481 15.145 5.5421V2.9061C15.145 2.4751 15.6629 2.2611 15.9579 2.5721C16.7203 3.37199 17.8873 4.5978 18.8738 5.63395C19.2735 6.05379 19.6436 6.44249 19.945 6.7591C20.2342 7.0621 20.0223 7.5651 19.6045 7.5661Z"
                      ></path>
                    </svg>
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
                  <svg
                    className="topbar__notif-svg feather feather-bell"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
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
