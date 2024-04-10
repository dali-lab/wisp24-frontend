/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './feed.css';

const Filter = (props) => {
  const [filterSwtich, setSwitch] = useState(false);
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState([]);
  const [year, setYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [datas, setData] = useState([]);
  const [showReccomendations, setShowReccomendation] = useState(false);
  const [tags, setTag] = useState(['math', 'computer science', 'literature']);

  const fetchMajor = () => {
    if (tags.includes(major)) {
      setData([...datas, major]);
    }
    setMajor('');
    // setShowReccomendation(false);
  };

  const majorReccomendation = () => {
    // setMajor(e.target.value);
    // setShowReccomendation(true);
    return tags.filter((tag) => tag.toLowerCase().includes(major));
  };

  return (
    <div className="feed-root">
      { filterSwtich ? (
        <div className="filter-containter">
          <div className="filter-wrapper">
            <div className="search-container" id="major">
              <div id="search-bar">
                <input
                  placeholder="Major"
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <button type="submit" onClick={fetchMajor}>
                  <img src="/assets/search.png" alt="search" />
                </button>
              </div>
              <div className="search-reccomendation-container">
                { majorReccomendation().map((rec) => (
                  <div key={rec}>
                    {rec}
                  </div>
                ))}
              </div>
              <div className="search-result-container"> {datas.map(((result) => (
                <div key={result} className="tags">
                  {result}
                  <button type="button" onClick={() => setData(datas.filter((data) => data !== result))}>x</button>
                </div>
              )))}
              </div>
            </div>

            <div className="search-container" id="minor">
              <div id="search-bar">
                <input placeholder="Minor" />
                <button type="button">
                  <img src="/assets/search.png" alt="search" />
                </button>
              </div>

            </div>

            <div className="search-container" id="year">
              <div id="search-bar">
                <input placeholder="Year" />
                <button type="button">
                  <img src="/assets/search.png" alt="search" />
                </button>
              </div>

            </div>

            <div className="search-container" id="classes">
              <div id="search-bar">
                <input placeholder="Classes" />
                <button type="button">
                  <img src="/assets/search.png" alt="search" />
                </button>
              </div>

            </div>

          </div>
          <button type="button" id="filter-btn-on" onClick={() => setSwitch(!filterSwtich)}>
            <img src="./assets/filter-btn.png" alt="Filter" />
          </button>
        </div>
      ) : (
        <button type="button" id="filter-btn-off" onClick={() => setSwitch(!filterSwtich)}>
          <img src="./assets/filter-btn.png" alt="Filter" />
        </button>
      )}
    </div>
  );
};
export default Filter;
