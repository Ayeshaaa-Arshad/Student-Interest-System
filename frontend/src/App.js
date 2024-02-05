// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './StudentList';
import Dashboard from './Dashboard';
import AddStudent from './AddStudent';
import Crud from './Crud';
import LoginSignup from './LoginSignup';
<<<<<<< HEAD
import StudentDetails from './StudentDetails';
import EditStudent from './EditStudent';
=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22

const App = () => {
  return (
   <Router>
      <Route path="/students" component={StudentList} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/addStudent" component={AddStudent} />
<<<<<<< HEAD
      <Route path="/StudentDetails/:id" component={StudentDetails} />
      <Route path="/EditStudent/:id" component={EditStudent} />
=======
>>>>>>> 0f7aab7dc7ee46e859dd06eddb41ca9e575c5d22
      <Route path="/crud" component={Crud} />
      <Route path="/LoginSignup" component={LoginSignup} />
    </Router>
  );
};

export default App;
