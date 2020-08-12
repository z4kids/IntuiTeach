import React from 'react';
import Sidebar from './sidebar.js';
import trophy from '../images/trophy.svg';
import struggling from '../images/struggling.svg'
import { Row, Col, Container } from 'react-bootstrap';

var struggle_percent = "14%";
var average_time = "20";
var hardest_questions = "1";
const Dashboard = () => (
    <div className="dashboard">
        <Container fluid>
            <Row>
                <Col xs={1} id="no-padding">
                    <Sidebar />
                </Col>
                <Col xs={4}>
                    <div className='dashboard-container dashboard-card'>
                        <img className='container-img-txt' src={struggling}></img>
                        <h2 className='dashboard-text'>Struggling Students {struggle_percent}</h2>


                    </div>
                </Col>
                <Col xs={4}>
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


export default Dashboard