import React from 'react';
import './Loading.css';

const Loading = (props) => {
  return (
    <div className="container">
      <svg
        className="loader"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 340"
      >
        <circle cx="170" cy="170" r="160" stroke="#E2007C" />
        <circle cx="170" cy="170" r="135" stroke="#404041" />
        <circle cx="170" cy="170" r="110" stroke="#E2007C" />
        <circle cx="170" cy="170" r="85" stroke="#404041" />
      </svg>
      {/* <h3 className="title">Loading...</h3> */}
    </div>
  );
};

export default Loading;
