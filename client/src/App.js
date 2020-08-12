import React from 'react';
import logo from './images/logo.svg';
import add_file from './images/add_file.svg';
import trophy from './images/trophy.svg';
import r_side from './images/rside.svg';
import homeside from './images/home-side.svg';
import statistics from './images/statistics.svg';
import r_side_home from './images/rside_home.svg';
import purple_side from './images/purple-side.svg';
import home_rotate from './images/home_rotate.svg';
import student_stats from './images/student_stats.svg';
import struggling from './images/struggling.svg'
import get_started from './images/get_started.svg';
import Quizmaker from './components/Quizmaker/Quizmaker.js';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Students from './components/students.js';
import Home from './components/home.js';
import Educators from './components/educators.js';
import Dashboard from './components/dashboard.js';

function App() {
  
  let [user, setUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3654/teacher/info', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(new_user => {
      console.log(new_user)
      setUser(new_user)
    })
  }, [])

  return (
    <div className="App">
      <Navigation hasUser={user}/>
      <Main user={user} setUser={setUser}/>
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
      <a class="navlink nav-link" href={(props.hasUser) ? '/dashboard' : 'http://localhost:3654/auth'} >{(props.hasUser) ? 'Dashboard' : 'Login'}</a>
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
