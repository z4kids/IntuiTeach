import React from 'react';
import logo from './images/logo.svg';
import trophy from './images/trophy.svg';
import struggling from './images/struggling.svg'
import Quizmaker from './components/Quizmaker/Quizmaker.js';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Row, Col, Container } from 'react-bootstrap';
import Sidebar from './components/sidebar.js';
import Students from './components/students.js';
import Home from './components/home.js';
import Educators from './components/educators.js';
var struggle_percent = "14%";
var average_time = "20";
var hardest_questions = "1"
function App() {
  
  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
}


const About = () => (
  <div className="about">
    <header className='header'></header>
  </div>
)


const Dashboard = () => (
  <div className="dashboard">
    <Container fluid>
      <Row>
        <Col xs={1} id = "no-padding">
          <Sidebar/>
        </Col>
        <Col xs={4}>
              <div className ='dashboard-container dashboard-card'>
                <img className='container-img-txt' src={struggling}></img>
                <h2 className= 'dashboard-text'>Struggling Students {struggle_percent}</h2>


              </div>
        </Col>
        <Col xs ={4}>
            <div className='dashboard-container dashboard-card'>
              <img className='container-img-txt' src={trophy}></img>
              <h2 className='dashboard-text'>Average Time {average_time}</h2>


            </div>
        </Col>
        <Col xs={3}>
            <div className='dashboard-container dashboard-card'>
              <img className='container-img-txt' src={struggling}></img>
              <h2 className='dashboard-text'>Longest to answer questions {hardest_questions}</h2>


            </div>
        </Col>
      </Row>
    </Container>
  </div>
)

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
      <Nav.Link as={NavLink} className="navlink" to='/about'>About</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/students'>Students</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/educators'>Educators</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" id = "login" to='/dashboard'>Login</Nav.Link>
    </Nav>
  </Navbar>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/students' component={Students}></Route>
    <Route exact path='/educators' component={Educators}></Route>
    <Route exact path='/dashboard' component={Dashboard}></Route>
    <Route exact path='/quizmaker' component={Quizmaker}></Route>
  </Switch>
);


export default App;
