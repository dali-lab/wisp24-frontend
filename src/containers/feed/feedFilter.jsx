import React, { useState } from 'react';
import './feed.css';

const Filter = () => {
  const [filterStatus, setStatus] = useState(false);
  return (
    <div>
      { filterStatus ? (
        <div className="filter-containter">
          <div className="filter-wrapper">
            <div className="search-container" id="major">
              <div id="search-bar">
                <input placeholder="Major" />
              </div>
            </div>

            <div className="search-container" id="minor">
              <div id="search-bar">
                <input placeholder="Minor" />
              </div>

            </div>

            <div className="search-container" id="year">
              <div id="search-bar">
                <input placeholder="Year" />
              </div>

            </div>

            <div className="search-container" id="classes">
              <div id="search-bar">
                <input placeholder="Classes" />
              </div>

            </div>

          </div>
          <button type="button" id="filter-btn-on" onClick={() => setStatus(!filterStatus)}>
            <img src="./assets/filter-btn.png" alt="Filter" />
          </button>
        </div>
      ) : (
        <button type="button" id="filter-btn-off" onClick={() => setStatus(!filterStatus)}>
          <img src="./assets/filter-btn.png" alt="Filter" />
        </button>
      )}
    </div>
  );
};
export default Filter;
