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
      <div className="potential-class-title">Potential Classes</div>
      <div className="potential-class-container">{classes.map((classItem, index) => (
        <div className="potential-class-item" key={classItem}>
          <p>{classItem}</p>
          <button type="submit" onClick={() => handleClickDelete(index)}>Delete Class</button>
        </div>
      ))}
      </div>
      <div className="potential-class-add-container">
        {editing
          ? (
            <div className="potential-class-add">
              <input type="text" onChange={handleChange} />
              <button className="potential-class-submit" type="submit" onClick={handleClickEditing}>Submit</button>
            </div>
          )
          : <div role="button" tabIndex={0} className="potential-class-add" type="submit" onClick={handleClickEditing}>Add Class</div>}
      </div>
    </div>
  );
};

export default PotentialClass;
