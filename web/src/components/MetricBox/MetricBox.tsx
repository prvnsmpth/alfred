import React from "react";

export const MetricBox = () => {
  return (
    <div className="box total-box">
      <div className="total-box__left">
        <div className="header-container">
          <h3 className="section-header">Time spent on calls</h3>
          <svg
            className="up-arrow"
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="42" height="42" rx="8" fill="#F6F7F9" />
            <path
              d="M27.0702 18.57L21.0002 12.5L14.9302 18.57"
              stroke="#7FB519"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 29.5V12.67"
              stroke="#7FB519"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 className="price">
          1:10:31
        </h1>
        <p>
          <span className="percentage-increase">20%</span> increase compared to last
          week
        </p>
      </div>
      <div className="total-box__right">
        <div className="header-container">
          <h3 className="section-header">Spam calls</h3>
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="42" height="42" rx="8" fill="#F6F7F9" />
            <path
              d="M27.0702 23.43L21.0002 29.5L14.9302 23.43"
              stroke="#FF4423"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 12.5V29.33"
              stroke="#FF4423"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 className="price">
          8
        </h1>
        <p>
          <span className="percentage-decrease">10%</span> decrease compared to last
          week
        </p>
      </div>
    </div>
  );
};
