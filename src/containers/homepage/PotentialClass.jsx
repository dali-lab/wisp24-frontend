import React, { useState } from 'react';
import './Homepage.css';

const PotentialClass = () => {
  const [classes, setClasses] = useState(['class1']);
  const [input, setInput] = useState();
  const [editing, setEditing] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleClickEditing = (event) => {
    if (editing) {
      setClasses((prevClasses) => [...prevClasses, input]);
    }
    event.preventDefault();
    setEditing(!editing);
  };

  const handleClickDelete = (index) => {
    const updatedClasses = classes.filter((classItem, i) => i !== index);
    setClasses(updatedClasses);
  };

  return (
    <div className="potential-class">
      <p>Potential Classes</p>
      <div>{classes.map((classItem, index) => (
        <div key={classItem}>
          <p>{classItem}</p>
          <button type="submit" onClick={() => handleClickDelete(index)}>Delete Class</button>
        </div>
      ))}
      </div>
      <div>
        {editing
          ? (
            <div>
              <input type="text" onChange={handleChange} />
              <button type="submit" onClick={handleClickEditing}>Submit Class</button>
            </div>
          )
          : <button type="submit" onClick={handleClickEditing}>Add Class</button>}
      </div>
    </div>
  );
};

export default PotentialClass;
