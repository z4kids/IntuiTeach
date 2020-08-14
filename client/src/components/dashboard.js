import React, {useEffect, useState} from 'react';
import Sidebar from './sidebar.js';
import trophy from '../images/trophy.svg';
import struggling from '../images/struggling.svg'
import { Row, Col, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import '../style/Dashboard.css'
import { calculateStatsByExam } from '../api/stats.js';
const Dashboard = () => {
    const [statsState, setStats] = useState({
        student_with_least_points: "Example",
        average_percentage_correct_for_exam: "80%",
        most_missed_question: "What is love?"
    })
    useEffect(() => {
        calculateStatsByExam("5f31e32f1dd4d716ec13fff2")
        .then(stats => setStats(stats))
    }, [])
    return(<div className="dashboard">
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
                        <p className='dashboard-content'>{statsState.student_with_least_points}</p>

                    </div>
                </Col>
                <Col xs={4}>
                    <div className='dashboard-container dashboard-card'>
                        <img className='container-img-txt' src={struggling}></img>
                        <h2 className='dashboard-text'>Most Missed Question</h2>
                        <p className='dashboard-content'>{statsState.most_missed_question}</p>

                    </div>
                    


                  
                </Col>
                <Col xs={3}>
                <div className='dashboard-container dashboard-card'>
                    <img className='container-img-txt' src={trophy}></img>
                    <h3 id = "percentage" className='dashboard-text'>Average Percentage</h3>
                    <p className='dashboard-content'>{statsState.average_percentage_correct_for_exam}</p>
                </div>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default Dashboard