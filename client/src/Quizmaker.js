import React from "react";
import { Nav, Button, ButtonToolbar, Form, Row, Col, FormLabel} from "react-bootstrap";
import { withRouter } from "react-router";
import './Quizmaker.css'


const Quizmaker = props => {
    return (
        <div>
            <ButtonToolbar  className='quiz-controls' aria-label="Quiz controls">
                <Button variant='light' size='lg'>Add Question</Button>
                <Button variant='primary' size='lg'>Save</Button>
            </ButtonToolbar>
            <div className='question-list'>
                <QuestionForm/>
                <QuestionForm/>
            </div>
            
        </div>
    );
};

const AnswerChoice = (props) => {
    return (
        <Form.Group>
            <Form.Label srOnly>Enter an Answer Choice</Form.Label>
            <Form.Control type='text' placeholder='Possible Answer'/>
        </Form.Group>
    )
}

const QuestionForm = (props) => (
    <Form className='question-form'>
        <h2>New Question</h2>
        <Form.Group>
            <Form.Label srOnly>Enter a Question</Form.Label>
            <Form.Control type='text' placeholder='Enter a Question'/>
        </Form.Group>
        <Row>
            <Col>
                <AnswerChoice/>
            </Col>
            <Col>
                <AnswerChoice/>
            </Col>
        </Row>
        <Row>
            <Col>
                <AnswerChoice/>
            </Col>
            <Col>
                <AnswerChoice/>
            </Col>
        </Row>
    </Form>
)
export default Quizmaker;