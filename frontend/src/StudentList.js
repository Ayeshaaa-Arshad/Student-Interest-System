// StudentList.js

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './StudentList.css';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [total_count, setTotalCount] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize, sortColumn, sortOrder]);

  const fetchStudents = () => {
    axios
      .get(`/api/students/all?_page=${currentPage}&_limit=${pageSize}&_sort=${sortColumn}&_order=${sortOrder}`, {
        withCredentials: true,
      })
      .then((response) => {
        setStudents(response.data.students);
         setTotalCount(response.data.total_count);
         console.log('Number of students:', response.data.total_count);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToLastPage = () => {
    const totalPages = Math.ceil(total_count / pageSize);
    setCurrentPage(totalPages);
  };

  const goToFirstPage = () => setCurrentPage(1);

  const handleSort = (column) => {
    const newOrder = column === sortColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortColumn(column);
    setSortOrder(newOrder);
  };

  const renderArrow = (column) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <div className="student-list">
      <h1 className="center">Student Interest System</h1>
      <div className="top-right">
        <label htmlFor="pageSize">Entries per Page:</label>
        <select id="pageSize" onChange={handlePageSizeChange} value={pageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="buttons">
        <button className="add-student-button" onClick={()=>navigate('/dashboard')>Dashboard</button>
        <button className="add-student-button"onClick={()=>navigate('/addstudent')>Add Student</button>
      </div>
      <div className="student-table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>
                    ID {renderArrow('id')}
                  </th>
                  <th onClick={() => handleSort('roll_number')}>
                    Roll Number {renderArrow('roll_number')}
                  </th>
                  <th onClick={() => handleSort('name')}>
                    Name {renderArrow('name')}
                  </th>
                  <th onClick={() => handleSort('city')}>
                    City {renderArrow('city')}
                  </th>
                  <th onClick={() => handleSort('degree')}>
                    Degree {renderArrow('degree')}
                  </th>
                  <th onClick={() => handleSort('dob')}>
                    DOB {renderArrow('dob')}
                  </th>
                  <th onClick={() => handleSort('interest__name')}>
                    Interest {renderArrow('interest__name')}
                  </th>
                  <th onClick={() => handleSort('dept_id__deptName')}>
                    Department {renderArrow('dept_id__deptName')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.roll_number}>
                    <td>{student.id}</td>
                    <td>{student.roll_number}</td>
                    <td>{student.name}</td>
                    <td>{student.city}</td>
                    <td>{student.degree}</td>
                    <td>{student.dob}</td>
                    <td>{student.interest ? student.interest.name : 'N/A'}</td>
                    <td>{student.dept_id ? student.dept_id : 'N/A'}</td>
                    <td>
                      <button className="view-button">View</button>
                      <button className="edit-button">Edit</button>
                      <button className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button disabled={currentPage === 1} onClick={goToFirstPage}>
                {'<<'}
              </button>
              <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                {'<'}
              </button>
              {Array.from({ length: Math.ceil(total_count / pageSize) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === Math.ceil(total_count / pageSize)}
                onClick={() => paginate(currentPage + 1)}
              >
                {'>'}
              </button>
              <button
                disabled={currentPage === Math.ceil(total_count / pageSize)}
                onClick={goToLastPage}
              >
                {'>>'}
              </button>
            </div>
            <div className="page-info">
              Page {currentPage} of {Math.ceil(total_count/ pageSize)}
            </div>

          </>
        )}
      </div>
    </div>
  );
};


export default StudentList;
