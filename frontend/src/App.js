// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './StudentList';
import Dashboard from './Dashboard';
import AddStudent from './AddStudent';
import Crud from './Crud';
import LoginSignup from './LoginSignup';

const App = () => {
  return (
   <Router>
      <Route path="/students" component={StudentList} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/addStudent" component={AddStudent} />
      <Route path="/crud" component={Crud} />
      <Route path="/LoginSignup" component={LoginSignup} />
    </Router>
  );
};

export default App;
