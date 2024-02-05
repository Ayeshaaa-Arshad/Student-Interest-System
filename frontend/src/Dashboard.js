import 'chart.js';
import './Dashboard.css';
import axios from './axiosConfig';
import React, { useState, useEffect } from 'react';
import { PieChart, LineChart } from 'react-chartkick';
<<<<<<< HEAD
//import { useNavigate } from 'react-router-dom';
import 'react-chartkick';
import 'chartkick/chart.js';
import { Link } from 'react-router-dom';
import StudentList from './StudentList';
import AddStudent from './AddStudent';


const Dashboard = () => {
  //const navigate=useNavigate();
=======
import { useNavigate } from 'react-router-dom';
import 'react-chartkick';
import 'chartkick/chart.js';

const Dashboard = () => {
  const navigate=useNavigate();
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
  const [topInterests, setTopInterests] = useState([]);
  const [bottomInterests, setBottomInterests] = useState([]);
  const [distinctInterests, setDistinctInterests] = useState(0);
  const [provincialDistribution, setProvincialDistribution] = useState({});
  const [submissionData, setSubmissionData] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState({});
  const [degreeDistribution, setDegreeDistribution] = useState({});
  const [genderDistribution, setGenderDistribution] = useState({});
  const [last30DaysActivity, setLast30DaysActivity] = useState([]);
  const [last24HoursActivity, setLast24HoursActivity] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [activeHours, setActiveHours] = useState([]);
  const [leastActiveHours, setLeastActiveHours] = useState([]);
  const [deadHours, setDeadHours] = useState([]);

  useEffect(() => {
    // Fetch data from your API or database here
    const fetchData = async () => {
      try {
        // Fetch top interests
       const topInterestsResponse = await axios.get('/api/top_interests');
        setTopInterests(topInterestsResponse.data);

        // Fetch bottom interests
        const bottomInterestsResponse = await axios.get('/api/bottom_interests');
        setBottomInterests(bottomInterestsResponse.data);

        // Fetch distinct interests count
        const response = await axios.get('/api/distinct_interests');
        setDistinctInterests(response.data);

        // Fetch provincial distribution data
        const provincialDistributionResponse = await axios.get('/api/provincial_distribution');
        const chartData = provincialDistributionResponse.data.map(item => [item.city, item.count]);
        setProvincialDistribution(chartData);

        // Fetch submission data
        const submissionDataResponse = await axios.get('/api/submission_data');
        setSubmissionData(submissionDataResponse.data);

        const deptDataResponse = await axios.get('/api/department_distribution');
        setDepartmentDistribution(deptDataResponse.data);

        // Fetch degree distribution data
        const degreeDistributionResponse = await axios.get('/api/degree_distribution');
        setDegreeDistribution(degreeDistributionResponse.data);

        // Fetch gender distribution data
        const genderDistributionResponse = await axios.get('/api/gender_distribution');
        setGenderDistribution(genderDistributionResponse.data);

        // Fetch last 30 days activity data
        const last30DaysActivityResponse = await axios.get('/api/last_30_days_activity');
        setLast30DaysActivity(last30DaysActivityResponse.data);

        // Fetch last 24 hours activity data
        const last24HoursActivityResponse = await axios.get('/api/last_24_hours_activity');
        setLast24HoursActivity(last24HoursActivityResponse.data);

        const studentStatus = await axios.get('/api/student_status');
        setStudentStatus(studentStatus.data);


        const activeHours = await axios.get('/api/active_hours');
        setActiveHours(activeHours.data);

        const leastActiveHours = await axios.get('/api/least_active_hours');
        setLeastActiveHours(leastActiveHours.data);

        const deadHours = await axios.get('/api/dead_hours');
        setDeadHours(deadHours.data);


        // Fetch more data if needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="dashboard-container">
      <center>
        <h1>Student Interests System</h1>
      </center>
      <div className="buttons">
<<<<<<< HEAD
        <Link to={`/students`} className="add-student-button">Student List</Link>
        <Link to={`/AddStudent`} className="add-student-button">Add Student</Link>
=======
        <button className="add-student-button" onClick={()=>navigate('/students')}>Student List</button>
        <button className="add-student-button" onClick={()=>navigate('/addstudent')>Add Student</button>
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
      </div>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Interests Section */}
          <div className="interests">
            <div className="top-interests">
              <h2>Top 5 Interests</h2>
              <div className="interest-tiles">
                {topInterests.map((interestData, index) => (
                  <div key={index} className="interest-tile">
                    <p className="interest-name">{interestData.interest.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bottom-interests">
              <h2>Bottom 5 Interests</h2>
              <div className="interest-tiles">
                {bottomInterests.map((interestData, index) => (
                  <div key={index} className="interest-tile">
                    <p className="interest-name">{interestData.interest.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Distinct Interests Section */}
         <div className="distinct-interests">
          <div className="count-tile">
          <p>Distinct Interests</p>
            <p>{distinctInterests ? distinctInterests.length : 0}</p>
          </div>
        </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Provincial Distribution */}
          <div className="provincial-distribution" style={{ minWidth: 0 }}>
            <h2> City Distribution Chart</h2>
            <PieChart data={provincialDistribution} colors={['teal','#435E55FF','gray','#435E55FF','#184A45FF' ]} />
          </div>

          {/* Submission Chart */}
          <div className="submission-chart" style={{ minWidth: 0 }}>
            <h2>Submission Chart</h2>
            <LineChart
          data={submissionData.map(entry => [entry.timestamp, entry.id])}
          colors={['teal', 'gray']}
        />
          </div>

             {/* Department Distribution */}
            <div className="department-distribution" style={{ minWidth: 0 }}>
              <h2>Department Distribution</h2>
              {Array.isArray(departmentDistribution) && departmentDistribution.length > 0 ? (
                <PieChart data={departmentDistribution.map(entry => [entry.deptName, entry.count])} colors={['#184A45FF','#435E55FF','gray','#435E55FF','#184A45FF' ]} />
              ) : (
                <p>No data available</p>
              )}
            </div>

        </div>


        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Degree Distribution */}
            <div className="degree-distribution">
              <h2>Degree Distribution</h2>
              {Array.isArray(degreeDistribution) ? (
                <PieChart data={degreeDistribution.map(entry => [entry.degree, entry.count])} colors={['#184A45FF','#435E55FF','gray','#435E55FF','#184A45FF' ]} />
              ) : (
                <p>No data available</p>
              )}
          </div>


          {/* Gender Distribution */}
          <div className="gender-distribution">
            <h2>Gender Distribution</h2>
                {Array.isArray(genderDistribution) ? (
                <PieChart data={genderDistribution.map(entry => [entry.gender, entry.count])} colors={['#435E55FF','#184A45FF','#435E55FF','gray','#435E55FF','#184A45FF' ]} />
              ) : (
                <p>No data available</p>
              )}
          </div>

    </div>

        <div className="activity-container" style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Last 30 Days Activity */}
          <div className="last-30-days-activity" style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
            <h2>Last 30 Days Activity</h2>
            <LineChart data={last30DaysActivity.map(entry => [entry.activity_type,entry.count])} />
          </div>

          {/* Last 24 Hours Activity */}
          <div className="last-24-hours-activity" style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
            <h2>Last 24 Hours Activity</h2>
            <LineChart data={last24HoursActivity.map(entry => [entry.timestamp,entry.count])} />
          </div>

        {/* Students Status Grid */}
        <div className="students-status-grid" style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
          <h2>Students Status Grid</h2>

          {/* Render the grid with counts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              Studying
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              {studentStatus.studying_count}
            </div>

            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              Recently Enrolled
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              {studentStatus.recently_enrolled_count}
            </div>

            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              About to Graduate
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              {studentStatus.about_to_graduate_count}
            </div>

            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              Graduated
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              {studentStatus.graduated_count}
            </div>
          </div>
        </div>


        </div>

  <div className="tile">
      <div className="active-hours-tile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', margin: '10px 0', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="most-active" style={{ flex: '1', textAlign: 'center' }}>
          <h3>Most Active Hours (Last 30 Days)</h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {activeHours.map(hourData => (
              <li key={hourData.hour} style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>{hourData.formatted_time}</span>
                <span>{' '}{hourData.count} actions</span>
              </li>
            ))}
          </ul>
        </div>
          <div className="least-active" style={{ flex: '1', textAlign: 'center' }}>
            <h3>Least Active Hours (Last 30 Days)</h3>
           <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {leastActiveHours.map(hourData => (
              <li key={hourData.hour} style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>{hourData.formatted_time}</span>
                <span>{' '}{hourData.count} actions</span>
              </li>
            ))}
          </ul>
          </div>
            <div className="dead-hours" style={{ flex: '1', textAlign: 'center' }}>
            <h3>Dead Hours (Last 30 Days)</h3>
             <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {deadHours.map(hourData => (
              <li key={hourData.hour} style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>{hourData.formatted_time}</span>
                <span>{' '}{hourData.count} actions</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Dashboard;
