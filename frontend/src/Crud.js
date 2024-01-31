// AddStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddStudent.css';
//import { useHistory } from 'react-router-dom';

const AddStudent = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    email: '',
    gender: 'female',
    dob: '',
    city: '',
    degree: '',
    interest: '',
    dept_id: '',
    graduation_date: null,
    enrollment_date: null,
  });


//  const history = useHistory();
const fetchInterests = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/interests');
    setInterests(response.data);
    console.log('Fetched Interests:', response.data);
  } catch (error) {
    console.error('Error fetching interests:', error.message);
  }
};

useEffect(() => {
  const fetchData = async () => {
    await fetchInterests();
  };

  fetchData();
}, []); // Empty dependency array ensures that the effect runs only once



  const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Check if the changed field is 'interest' and update its structure accordingly
  if (name === 'interest') {
    setFormData({
      ...formData,
      [name]: value, // Assuming 'value' is the ID of the selected interest
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log('selectedInterest:', selectedInterest);
    console.log('formData:', formData);

    // Fetch the selected interest based on its ID
    const selectedInterestObject = interests.find(interest => interest.id === selectedInterest);

    // Check if selectedInterestObject is available
    if (!selectedInterestObject) {
      console.error('Selected interest not found.');
      return;
    }

    // Send the data with the interest field as an object
    const response = await axios.post('http://127.0.0.1:8000/api/add_student/', {
      ...formData,
      interest: { id: selectedInterestObject.id, name: selectedInterestObject.name },
    });

    console.log('Student added successfully:', response.data);

    // Redirect to the students route
    // history.push('/students');
  } catch (error) {
    console.error('Error adding student:', error.response.data);
  }
};



const handleInterestChange = (event) => {
  const selectedValue = event.target.value;

  // Update the selectedInterest state
  setSelectedInterest(selectedValue);

  // Update the formData state for the interest field
  setFormData({
    ...formData,
    interest: selectedValue,
  });
};


  const handleNewInterestChange = (event) => {
    setNewInterest(event.target.value);
  };

  const handleAddInterest = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add_interest/', { name: newInterest });
      setInterests([...interests, response.data]);
      setSelectedInterest(response.data.id);  // Set the newly created interest as selected
      setNewInterest('');
      console.error('Added Student:');
    } catch (error) {
      console.error('Error adding interest:', error.message);
    }
  };

  return (
    <div className="add-container">
      <h1 className="center">Student Interest System</h1>

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-row">
          <div className="field">
            <label>Name:</label>
            <input type="text" name="name" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label>Roll Number:</label>
            <input type="text" name="roll_number" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label>Email:</label>
            <input type="email" name="email" onChange={handleInputChange} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="field">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="field">
            <label>Date of Birth:</label>
            <input type="date" name="dob" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label>City:</label>
            <input type="text" name="city" onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          {/* Dropdown for existing interests */}
          <div className="field">
            <label>Interest:</label>
           <select name="interest" value={selectedInterest} onChange={handleInterestChange}>
              <option value="">Select an interest</option>
              {interests.map((interest) => (
                <option key={interest.id} value={interest.id}>
                  {interest.name}
                </option>
              ))}
            </select>
          </div>

      {/* Input field for new interest */}
      <div className="field">
        <label>New Interest:</label>
        <input type="text" name="newInterest" value={newInterest} onChange={handleNewInterestChange} />
      </div>

          {/* Button to add a new interest */}
          <div className="buttons">
          <button type="button" onClick={handleAddInterest} className="Add-Button">Add Interest</button>
        </div>
        </div>

        {/* Row 4 */}
        <div className="form-row">
          <div className="field">
            <label>Department:</label>
            <input type="text" name="dept_id" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label>Degree Title:</label>
            <input type="text" name="degree" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label>Subject:</label>
            <input type="text" name="subject" onChange={handleInputChange} />
          </div>
        </div>

        {/* Row 5 */}
        <div className="form-row">
          <div className="field">
            <label>Start Date:</label>
            <input type="date" name="start_date" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label>End Date:</label>
            <input type="date" name="end_date" onChange={handleInputChange} />
          </div>
        </div>

        {/* Row 6 */}
        <div className="form-row">
          <button type="submit" className="create-button">Update</button>
          <button type="button" className="cancel-button">Delete</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
