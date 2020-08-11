import React from 'react';
import logo from './images/logo.svg';

import Quizmaker from './components/Quizmaker/Quizmaker.js';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Students from './components/students.js';
import Home from './components/home.js';
import Educators from './components/educators.js';
import Dashboard from './components/dashboard.js';

function App() {
  
  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
}

//Test for buttons
function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
  }

}

const Navigation = () => (
  <Navbar className="nav" bg="light" variant="light" fixed="top">
    <Navbar.Brand as = {NavLink} to="/"> <img src={logo} className="logo" /></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} className = "navlink" id = "home" to='/'>Home</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/students'>Students</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/educators'>Educators</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" id = "login" to='/dashboard'>Login</Nav.Link>
    </Nav>
  </Navbar>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/students' component={Students}></Route>
    <Route exact path='/educators' component={Educators}></Route>
    <Route exact path='/dashboard' component={Dashboard}></Route>
    <Route exact path='/quizmaker' component={Quizmaker}></Route>
  </Switch>
);


export default App;
