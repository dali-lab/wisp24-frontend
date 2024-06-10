import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
    // MajorEditToggle Component
    //const MajorEditToggle = ({ userID }) => {
    const [selectedMajorOption, setSelectedMajorOption] = useState(null);
  
    const options = [
      { value: 'Econometrics and quantitative economics', label: 'Econometrics and quantitative economics' },
      { value: 'Political science and government', label: 'Political science and government' },
      { value: 'Computer science', label: 'Computer science' },
      { value: 'Engineering science', label: 'Engineering science' },
      { value: 'Experimental psychology', label: 'Experimental psychology' },
      { value: 'Biology/biological sciences', label: 'Biology/biological sciences' },
      { value: 'Mathematics', label: 'Mathematics' },
      { value: 'Neuroscience', label: 'Neuroscience' },
      { value: 'History', label: 'History' },
      { value: 'Anthropology', label: 'Anthropology' },
      { value: 'Environmental studies', label: 'Environmental studies' },
      { value: 'English language and literature', label: 'English language and literature' },
      { value: 'Sociology', label: 'Sociology' },
      { value: 'Geography', label: 'Geography' },
      { value: 'Cognitive science', label: 'Cognitive science' },
      { value: 'Film/cinema/video studies', label: 'Film/cinema/video studies' },
      { value: 'Music', label: 'Music' },
      { value: 'Philosophy', label: 'Philosophy' },
      { value: 'Fine/studio arts', label: 'Fine/studio arts' },
      { value: 'Bioengineering and biomedical engineering', label: 'Bioengineering and biomedical engineering' },
      { value: 'Hispanic and latin american languages, literatures, and linguistics', label: 'Hispanic and latin american languages, literatures, and linguistics' },
      { value: 'Physics', label: 'Physics' },
      { value: 'Asian studies/civilization', label: 'Asian studies/civilization' },
      { value: 'Near and middle eastern studies', label: 'Near and middle eastern studies' },
      { value: 'Religion/religious studies', label: 'Religion/religious studies' },
      { value: 'African-american/black studies', label: 'African-american/black studies' },
      { value: 'Geology/earth science', label: 'Geology/earth science' },
      { value: 'Art history, criticism and conservation', label: 'Art history, criticism and conservation' },
      { value: 'Classical, ancient mediterranean and near eastern studies and archaeology', label: 'Classical, ancient mediterranean and near eastern studies and archaeology' },
      { value: 'Multi-/interdisciplinary studies', label: 'Multi-/interdisciplinary studies' },
      { value: 'Latin american and caribbean studies', label: 'Latin american and caribbean studies' },
      { value: 'Linguistics', label: 'Linguistics' },
      { value: 'Romance languages, literatures, and linguistics', label: 'Romance languages, literatures, and linguistics' },
      { value: 'Italian language and literature', label: 'Italian language and literature' },
      { value: 'Classics and classical languages, literatures, and linguistics', label: 'Classics and classical languages, literatures, and linguistics' },
      { value: 'Chemistry', label: 'Chemistry' },
      { value: 'Russian studies', label: 'Russian studies' },
      { value: 'Women\'s studies', label: 'Women\'s studies' },
      { value: 'German language and literature', label: 'German language and literature' },
      { value: 'Geological and earth sciences/geosciences', label: 'Geological and earth sciences/geosciences' },
      { value: 'French language and literature', label: 'French language and literature' },
      { value: 'Drama and dramatics/theatre arts', label: 'Drama and dramatics/theatre arts' },
      { value: 'French studies', label: 'French studies' },
      { value: 'American indian/native american studies', label: 'American indian/native american studies' },
      { value: 'Comparative literature', label: 'Comparative literature' },
      { value: 'Ancient studies/civilization', label: 'Ancient studies/civilization' },
      { value: 'Engineering physics/applied physics', label: 'Engineering physics/applied physics' },
      { value: 'Russian language and literature', label: 'Russian language and literature' },
      { value: 'Portuguese language and literature', label: 'Portuguese language and literature' },
      { value: 'Astronomy', label: 'Astronomy' }
    ];
  
    const handleChange = (selectedOption) => {
      setSelectedMajorOption(selectedOption);
      updateUserData(userID, { major: selectedOption.value });
      console.log('Option selected:', selectedOption);
    };
  
    return (
      <div className="major-edit-toggle">
        <Select
          id="dropdown"
          value={selectedMajorOption}
          onChange={handleChange}
          options={options}
          isSearchable
          placeholder="Select your major"
        />
      </div>
    );
};

export default Dropdown;
