<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './StudentList.css';
import { Link } from 'react-router-dom';
import StudentDetails from './StudentDetails';
import Dashboard from './Dashboard';
import AddStudent from './AddStudent';

=======
// StudentList.js

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './StudentList.css';
import { useNavigate } from 'react-router-dom';
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [total_count, setTotalCount] = useState(0);
<<<<<<< HEAD
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    fetchStudents();
    fetchDepartments();
=======
  const navigate=useNavigate();

  useEffect(() => {
    fetchStudents();
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
  }, [currentPage, pageSize, sortColumn, sortOrder]);

  const fetchStudents = () => {
    axios
      .get(`/api/students/all?_page=${currentPage}&_limit=${pageSize}&_sort=${sortColumn}&_order=${sortOrder}`, {
        withCredentials: true,
      })
      .then((response) => {
        setStudents(response.data.students);
<<<<<<< HEAD
        setTotalCount(response.data.total_count);
=======
         setTotalCount(response.data.total_count);
         console.log('Number of students:', response.data.total_count);
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

<<<<<<< HEAD
  const fetchDepartments = () => {
    axios
      .get('/api/departments', {
        withCredentials: true,
      })
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  };

  const getDepartmentName = (deptId) => {
    const department = departments.find((dept) => dept.id === deptId);
    return department ? department.deptName : 'N/A';
  };

=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
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

<<<<<<< HEAD
const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios
        .delete(`http://127.0.0.1:8000/api/students/${studentId}`, {
          withCredentials: true,
        })
        .then(() => {
          // Redirect to the home page or another appropriate route

        })
        .catch((error) => {
          console.error('Error deleting student:', error);
        });
    }
  };
=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
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
<<<<<<< HEAD
        <Link to={`/Dashboard`} className="add-student-button">Dashboard</Link>
       <Link to={`/AddStudent`} className="add-student-button">Add Student</Link>
=======
        <button className="add-student-button" onClick={()=>navigate('/dashboard')>Dashboard</button>
        <button className="add-student-button"onClick={()=>navigate('/addstudent')>Add Student</button>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
      </div>
      <div className="student-table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
<<<<<<< HEAD
                  <th onClick={() => handleSort('id')}>ID {renderArrow('id')}</th>
                  <th onClick={() => handleSort('roll_number')}>Roll Number {renderArrow('roll_number')}</th>
                  <th onClick={() => handleSort('name')}>Name {renderArrow('name')}</th>
                  <th onClick={() => handleSort('city')}>City {renderArrow('city')}</th>
                  <th onClick={() => handleSort('degree')}>Degree {renderArrow('degree')}</th>
                  <th onClick={() => handleSort('dob')}>DOB {renderArrow('dob')}</th>
                  <th onClick={() => handleSort('interest__name')}>Interest {renderArrow('interest__name')}</th>
                  <th onClick={() => handleSort('dept_id__deptName')}>Department {renderArrow('dept_id__deptName')}</th>
=======
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
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
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
<<<<<<< HEAD
                    <td>{getDepartmentName(student.dept_id)}</td>
                    <td>
                       {/* Use Link from React Router to navigate to StudentDetails component */}
                      <Link to={`/StudentDetails/${student.id}`} className="view-button">
                        View
                      </Link>
                      <Link to={`/EditStudent/${student.id}`} className="edit-button">Edit</Link>
                      <button className="delete-button" onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
=======
                    <td>{student.dept_id ? student.dept_id : 'N/A'}</td>
                    <td>
                      <button className="view-button">View</button>
                      <button className="edit-button">Edit</button>
                      <button className="delete-button">Delete</button>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
<<<<<<< HEAD
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={goToFirstPage}>{'<<'}</button>
              <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>{'<'}</button>
=======

            <div className="pagination">
              <button disabled={currentPage === 1} onClick={goToFirstPage}>
                {'<<'}
              </button>
              <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                {'<'}
              </button>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
              {Array.from({ length: Math.ceil(total_count / pageSize) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
<<<<<<< HEAD
              <button disabled={currentPage === Math.ceil(total_count / pageSize)} onClick={() => paginate(currentPage + 1)}>{'>'}</button>
              <button disabled={currentPage === Math.ceil(total_count / pageSize)} onClick={goToLastPage}>{'>>'}</button>
            </div>
            <div className="page-info">
              Page {currentPage} of {Math.ceil(total_count / pageSize)}
            </div>
=======
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

>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
          </>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
=======

>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
export default StudentList;
