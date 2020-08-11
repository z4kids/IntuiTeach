import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import lside from '../images/Side.svg';
import r_side from '../images/rside.svg';


const Students = () => (
    <div className="students">
        <header className='header'></header>
        <img src={lside} className='side' />
        <img src={r_side} className='rside' />
        <h1 className='page-header'>Students</h1>
        <h2 className='enter-meeting-header'>Enter the Zoom Meeting</h2>
        <Form className='student-form'>
            <Row>
                <Col>
                    <Form.Group controlId="room-code">
                        <Form.Label className="student-form-label">Enter Room Code:</Form.Label>
                        <div className="student-form-text-padding">
                            <Form.Control size="lg" type="text" placeholder="Room Code" />
                        </div>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="room-password">
                        <Form.Label className="student-form-label">Enter Room Password:</Form.Label>
                        <div className="student-form-text-padding">
                            <Form.Control size="lg" type="text" placeholder="Room Password" />
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            <Button className='main-button' variant='primary' type="submit" size='lg'>Submit</Button>
        </Form>
    </div>
);

export default Students