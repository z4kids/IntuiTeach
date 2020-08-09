import React from 'react';
import Side from './Side.svg';
import logo from './logo.svg';
import add_file from './add_file.svg';
import r_side from './rside.svg';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';


function App() {
  
  return (
    <div className="App">
      <Navigation />
      <Main />
      <header className="App-header">
      </header>
      <img src={Side} className='side' />
      <img src={r_side} className='rside' />
      <h1 className="header">z4kids</h1>
      
    </div>

  );


}

const Students = () => (
  <div className="students">
    <img src={Side} className='side' />
    <h2 className='student-header'>Enter the Zoom Meeting</h2>
    <Form className='student-form'>
      <Row>
        <Col>
          <Form.Group controlId="room-code">
            <Form.Label className = "student-form-label">Enter Room Code:</Form.Label>
            <div className = "student-form-text-padding">
              <Form.Control size="lg" type="text" placeholder="Room Code"/>
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="room-password">
            <Form.Label className = "student-form-label">Enter Room Password:</Form.Label>
            <div className = "student-form-text-padding">
              <Form.Control size="lg" type="text" placeholder="Room Password" />
            </div>
          </Form.Group>
        </Col>
      </Row>
      
      <Button variant = 'primary' type="submit" size='lg'>Submit</Button>
    </Form>
  </div>
);

const Home = () => (
  <div className="home"></div>
);

const About = () => (
  <div className="about"></div>
)

const Educators = () => (
  <div className="educators">
    <button><img src={add_file} alt="add question" onClick={ActionLink.handleClick}/></button>
  </div>
)

function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }

  }


const Navigation = () => (
  <Navbar className = "nav" bg="light" variant="light">
    <Navbar.Brand as = {NavLink} to="/"> <img src={logo} className="logo" /></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} className = "navlink" id = "home" to='/'>Home</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/about'>About</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/students'>Students</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/educators'>Educators</Nav.Link>
    </Nav>
  </Navbar>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/students' component={Students}></Route>
    <Route exact path='/educators' component={Educators}></Route>
  </Switch>
);


export default App;
