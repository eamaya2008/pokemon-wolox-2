import React, { memo } from 'react';
const Loader = memo(() => (
  <div className="loader-container">
    <div className="loader-item">
      <div className="loader-ball"></div>
      <div className="loader-half-ball"></div>
      <div className="loader-big-button"></div>
      <div className="loader-small-button"></div>
      <div className="loader-horizon"></div>
    </div>
    <h4>Loading...</h4>
  </div>
));

export default Loader;
