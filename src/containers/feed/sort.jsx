import React, { useState } from 'react';

const Sort = () => {
  const [sort, setSort] = useState(false);
  return (
    <div>{sort ? (
      <div className="sort-container">
        <span>Sort by:</span>
        <div className="sort-wrapper">
          <button type="button" id="sort-btn" onClick={() => setSort(!sort)}> sort button</button>
          <div className="sort-opt-container">
            <button type="button" id="sort-options" onClick={() => setSort(!sort)}> most recent</button>
            <button type="button" id="sort-options" onClick={() => setSort(!sort)}> most relevant</button>
            <button type="button" id="sort-options" onClick={() => setSort(!sort)}> most popular</button>
          </div>
        </div>
      </div>
    )
      : (
        <div className="sort-container">
          <img src="" alt="" />
          <span>Sort by:</span>
          <button type="button" id="sort-btn" onClick={() => setSort(!sort)}>sort button</button>
        </div>

      )}
    </div>
  );
};
export default Sort;
