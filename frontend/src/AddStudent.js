<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddStudent.css';

=======
// AddStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddStudent.css';
//import { useHistory } from 'react-router-dom';
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22

const AddStudent = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [newInterest, setNewInterest] = useState('');
<<<<<<< HEAD
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
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

<<<<<<< HEAD
  const fetchInterests = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/interests');
      setInterests(response.data);
    } catch (error) {
      console.error('Error fetching interests:', error.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchInterests();
      await fetchDepartments();
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'interest') {
      setFormData({
        ...formData,
        [name]: value,
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
      let selectedInterestObject;

      if (selectedInterest) {
        selectedInterestObject = interests.find((interest) => interest.id === selectedInterest);
      } else {
        selectedInterestObject = interests.find((interest) => interest.name === formData.interest);
      }

      if (!selectedInterestObject) {
        console.error('Selected interest not found.');
        return;
      }

      const selectedDepartmentObject = departments.find((department) => department.id === selectedDepartment);

      if (!selectedDepartmentObject) {
        console.error('Selected department not found.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/add_student/', {
        ...formData,
        interest: { id: selectedInterestObject.id, name: selectedInterestObject.name },
        dept_id: selectedDepartmentObject.id,
      });

      console.log('Student added successfully:', response.data);
    } catch (error) {
      console.error('Error adding student:', error.response.data);
       // Clear form data
    setFormData({
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

    // Display success message or perform any other action
    alert('Student added successfully!');
    }
  };


const handleInterestChange = (event) => {
  const selectedValue = parseInt(event.target.value, 10);
  console.log('Selected Interest:', selectedValue);

  const selectedInterestObject = interests.find((interest) => interest.id === selectedValue);
  console.log('Selected Interest Object:', selectedInterestObject);

=======

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
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
  setSelectedInterest(selectedValue);

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
      setSelectedInterest(response.data.id);
      setNewInterest('');
<<<<<<< HEAD
      console.log('Added Interest:', response.data);
=======
      console.error('Added Student:');
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
    } catch (error) {
      console.error('Error adding interest:', error.message);
    }
  };

<<<<<<< HEAD
const handleDepartmentChange = (event) => {
  const selectedValue = parseInt(event.target.value, 10);
  console.log('Selected Department:', selectedValue);

  const selectedDepartmentObject = departments.find((department) => department.id === selectedValue);
  console.log('Selected Department Object:', selectedDepartmentObject);

  setSelectedDepartment(selectedValue);

  setFormData({
    ...formData,
    dept_id: selectedValue,
  });
};


=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
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

<<<<<<< HEAD
        {/* Row 3 */}
=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
        <div className="form-row">
          {/* Dropdown for existing interests */}
          <div className="field">
            <label>Interest:</label>
<<<<<<< HEAD
            <select name="interest" value={selectedInterest} onChange={handleInterestChange}>
=======
           <select name="interest" value={selectedInterest} onChange={handleInterestChange}>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
              <option value="">Select an interest</option>
              {interests.map((interest) => (
                <option key={interest.id} value={interest.id}>
                  {interest.name}
                </option>
              ))}
            </select>
          </div>

<<<<<<< HEAD
          {/* Input field for new interest */}
          <div className="field">
            <label>New Interest:</label>
            <input type="text" name="newInterest" value={newInterest} onChange={handleNewInterestChange} />
          </div>

          {/* Button to add a new interest */}
          <div className="buttons">
            <button type="button" onClick={handleAddInterest} className="Add-Button">
              Add Interest
            </button>
          </div>
=======
      {/* Input field for new interest */}
      <div className="field">
        <label>New Interest:</label>
        <input type="text" name="newInterest" value={newInterest} onChange={handleNewInterestChange} />
      </div>

          {/* Button to add a new interest */}
          <div className="buttons">
          <button type="button" onClick={handleAddInterest} className="Add-Button">Add Interest</button>
        </div>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
        </div>

        {/* Row 4 */}
        <div className="form-row">
          <div className="field">
            <label>Department:</label>
<<<<<<< HEAD
            <select name="dept_id" value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.deptName}
                </option>
              ))}
            </select>
=======
            <input type="text" name="dept_id" onChange={handleInputChange} />
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
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
<<<<<<< HEAD
          <button type="submit" className="create-button">
            Create
          </button>
          <button type="button" className="cancel-button">
            Cancel
          </button>
=======
          <button type="submit" className="create-button">Create</button>
          <button type="button" className="cancel-button">Cancel</button>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
