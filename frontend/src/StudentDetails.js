// StudentDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = ({ match }) => {
  const [student, setStudent] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = match.params.id;

    // Fetch student details
    axios
      .get(`http://127.0.0.1:8000/api/students/${studentId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setStudent(response.data);
        setLoading(false);

        const departmentId = response.data.dept_id;
        axios
          .get(`http://127.0.0.1:8000/api/departments`, {
            withCredentials: true,
          })
          .then((departmentResponse) => {
            const matchingDepartment = departmentResponse.data.find(
              (dept) => dept.id === departmentId
            );
            setDepartment(matchingDepartment);
          })
          .catch((error) => {
            console.error('Error fetching department details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
        setLoading(false);
      });
  }, [match.params.id]);

 return (
  <div className="student-details">
    <h2>Student Details</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="card">
        <div className="detail-row">
          <strong>ID:</strong> {student.id}
        </div>
        <div className="detail-row">
          <strong>Roll Number:</strong> {student.roll_number}
        </div>
        <div className="detail-row">
          <strong>Name:</strong> {student.name}
        </div>
        <div className="detail-row">
          <strong>City:</strong> {student.city}
        </div>
        <div className="detail-row">
          <strong>Degree:</strong> {student.degree}
        </div>
        <div className="detail-row">
          <strong>Date of Birth:</strong> {student.dob}
        </div>
        <div className="detail-row">
          <strong>Interest:</strong> {student.interest ? student.interest.name : 'N/A'}
        </div>
        {department && (
          <div className="detail-row">
            <strong>Department:</strong> {department.deptName}
          </div>
        )}
        {/* Add more details based on your Student and Department models */}
      </div>
    )}
  </div>
);

};

export default StudentDetails;
