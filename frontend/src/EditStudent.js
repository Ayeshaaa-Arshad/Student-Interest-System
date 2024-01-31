// EditStudent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ match }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedStudent, setEditedStudent] = useState({});
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [interestOptions, setInterestOptions] = useState([]);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const studentId = match.params.id;

    // Fetch student details
    axios
      .get(`http://127.0.0.1:8000/api/students/${studentId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setStudent(response.data);
        setEditedStudent(response.data); // Initialize editedStudent with current data
        setLoading(false);

        // Fetch department details once student details are loaded
        const departmentId = response.data.dept_id; // Assuming the API response includes the department ID
        axios
          .get(`http://127.0.0.1:8000/api/departments/${departmentId}`, {
            withCredentials: true,
          })
          .then((departmentResponse) => {
            setDepartment(departmentResponse.data);
          })
          .catch((error) => {
            console.error('Error fetching department details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
        setLoading(false);
      });

    // Fetch department options
    axios
      .get('http://127.0.0.1:8000/api/departments', { withCredentials: true })
      .then((response) => {
        setDepartmentOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching department options:', error);
      });

    // Fetch interest options
    axios
      .get('http://127.0.0.1:8000/api/interests', { withCredentials: true })
      .then((response) => {
        setInterestOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching interest options:', error);
      });
  }, [match.params.id]);

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Student Updated successfully!');
    // Perform API request to update student details with editedStudent data
    axios
      .put(`http://127.0.0.1:8000/api/students/${student.id}`, editedStudent, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Student details updated successfully:', response.data);
        // Redirect or perform any other action upon successful update
      })
      .catch((error) => {
        console.error('Error updating student details:', error);
      });
  };

  return (
    <div className="student-details">
      <h2>Edit Student</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card">
            {/* Display editable fields */}
            <div className="detail-row">
              <label>ID:</label>
              <input type="text" name="id" value={editedStudent.id} disabled />
            </div>
            <div className="detail-row">
              <label>Roll Number:</label>
              <input type="text" name="roll_number" value={editedStudent.roll_number} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
              <label>Name:</label>
              <input type="text" name="name" value={editedStudent.name} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
              <label>Department:</label>
              <select name="dept_id" value={editedStudent.dept_id} onChange={handleInputChange}>
                {departmentOptions.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.deptName}
                  </option>
                ))}
              </select>
            </div>
            <div className="detail-row">
              <label>Interest:</label>
              <select name="interest" value={editedStudent.interest} onChange={handleInputChange}>
                {interestOptions.map((interest) => (
                  <option key={interest.id} value={interest.id}>
                    {interest.name}
                  </option>
                ))}
              </select>
            </div>
            {/* ... other editable fields */}
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditStudent;
