import React from 'react';
import Sidebar from './sidebar.js';
import trophy from '../images/trophy.svg';
import struggling from '../images/struggling.svg'
import { Row, Col, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import '../style/Dashboard.css'
var student = "afdafdsafds";
var average_percentage= "80%";
var hardest_question = "What is the answer to life";
const Dashboard = () => (
    <div className="dashboard">
        <Container fluid>
            <Row>
                <Col xs={1} id="no-padding">
                    <Sidebar />
                </Col>
                <Col xs={4}>
                    <DropdownButton className="dropdown" id="dropdown-basic-button" title="Quizzes">
                        <Dropdown.Item href="#/action-1">Quiz 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Quiz 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Quiz 3</Dropdown.Item>
                    </DropdownButton>
                    <div className='dashboard-container dashboard-card'>
                        <img className='container-img-txt' src={struggling}></img>
                        <h2 className='dashboard-text'>Struggling Students</h2>
                        <p className='dashboard-content'>{student}</p>

                    </div>
                </Col>
                <Col xs={4}>
                    <div className='dashboard-container dashboard-card'>
                        <img className='container-img-txt' src={struggling}></img>
                        <h2 className='dashboard-text'>Most Missed Question</h2>
                        <p className='dashboard-content'>{hardest_question}</p>

                    </div>
                    


                  
                </Col>
                <Col xs={3}>
                <div className='dashboard-container dashboard-card'>
                    <img className='container-img-txt' src={trophy}></img>
                    <h3 id = "percentage" className='dashboard-text'>Average Percentage</h3>
                    <p className='dashboard-content'>{average_percentage}</p>
                </div>
                </Col>
            </Row>
        </Container>
    </div>
)


export default Dashboard