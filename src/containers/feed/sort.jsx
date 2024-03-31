import React, { useState } from 'react';

const Sort = () => {
  const [sort, setSort] = useState(false);
  return (
    <div>{sort ? <div> <button type="button" id="sort-btn" onClick={() => setSort(!sort)}>sort button</button> </div>
      : (
        <div> <button type="button" id="sort-btn" onClick={() => setSort(!sort)}> sort button</button>
          <button type="button" id="sort-options"> most recent</button>
          <button type="button" id="sort-options"> most relevant</button>
          <button type="button" id="sort-options"> most popular</button>
        </div>
      )}
    </div>
  );
};
export default Sort;
