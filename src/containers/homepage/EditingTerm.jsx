import React, { useState, useEffect } from 'react';

const EditingDraft = (props) => {
  const { selectedDraft, drafts } = props;
  const [input, setInput] = useState({
    draftName: '',
    classList: [],
  });
  const [inputData, setInputData] = useState({
    draftName: '',
    classTitle: '',
  });

  console.log(input);

  const setSelectedDraft = () => {
    props.handleSelectedDraft('');
  };
  // updates what is typed in the box, applies to old draft
  useEffect(() => {
    if (selectedDraft !== -1 && drafts[selectedDraft] != null) {
      setInput((prevInput) => ({
        ...prevInput,
        draftName: drafts[selectedDraft].draftName,
        classList: drafts[selectedDraft].classList,
      }));
    }
  }, [drafts, selectedDraft]);

  const [nameEditingState, setNameEditingState] = useState(false);
  const handleTermChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => {
      return { ...prevData, [name]: value }; // copies previous input
    });
  };

  const changeNameToggle = () => {
    setNameEditingState(!nameEditingState);
  };

  const changeNameToggleSubmit = () => {
    // updateDraftName((prevState) => ({ ...prevState }), inputData.draftName);
    setInput((prevState) => ({
      ...prevState,
      draftName: inputData.draftName,
    }));
    setInputData((prevState) => ({
      ...prevState,
      draftName: '', // Reset the input field after saving the class
    }));
    setNameEditingState(!nameEditingState);
  };

  const termSubmit = () => {
    props.termSubmit(selectedDraft, input);
    setSelectedDraft('');
  };

  const saveClass = () => {
    const newClassTitle = inputData.classTitle.trim(); // Trim any leading/trailing whitespace
    if (newClassTitle) {
      setInput((prevState) => ({
        ...prevState,
        classList: [...prevState.classList, newClassTitle],
      }));
      setInputData((prevState) => ({
        ...prevState,
        classTitle: '', // Reset the input field after saving the class
      }));
    }
  };

  const deleteClass = (index) => {
    const updatedClassList = input.classList.filter((classItem, i) => i !== index);
    setInput((prevState) => ({
      ...prevState,
      classList: updatedClassList,
    }));
  };

  let content;
  if (nameEditingState) { // if true
    content = (
      <div>
        <input type="text" onChange={handleTermChange} name="draftName" value={inputData.draftName} />
        {nameEditingState ? <button type="button" onClick={changeNameToggleSubmit}>Save Name</button> : <button type="button" onClick={changeNameToggle}>Change Name</button>}
      </div>
    );
  } else if (selectedDraft === -1) {
    if (input.draftName === '') {
      content = <p onClick={changeNameToggle}>Add Title</p>;
    } else {
      content = <p>{input.draftName}</p>;
    }
  } else {
    content = <p onClick={changeNameToggle}>{input.draftName}</p>;
  }

  return (
    <div className="editing-term">
      <div>{content}</div>
      <div>{input.classList && input.classList.map((classItem, index) => {
        return (
          <div key={classItem}>
            <div>{classItem}</div>
            <button type="button" onClick={() => deleteClass(index)}>Delete Class</button>
          </div>
        );
      })}
      </div>

      <input type="text" onChange={handleTermChange} name="classTitle" value={inputData.classTitle} />
      <button type="button" onClick={saveClass}>Add Class</button>
      <button type="button" onClick={termSubmit}>Save Change</button>
    </div>
  );
};

export default EditingDraft;
