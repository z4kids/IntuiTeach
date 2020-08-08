import React from 'react';
import Side from './Side.svg';
import logo from './logo.svg'
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'


function App() {
  
  return (
    <div className="App">
      <Navigation />
      <Main />
      <img src={Side} className='side' />
      <h1 className="header">z4kids</h1>
      <header className="App-header">
      </header>
    </div>

  );


}


const Students = () => (
  <div className="students">
    <img src={Side} className='side' />
  
  </div>
);

const Home = () => (
  <div className="home"></div>
);

const About = () => (
  <div className="about"></div>
)

const Educators = () => (
  <div className="educators"></div>
)
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
