import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import AnswerChoice from './AnswerChoice'

const QuestionForm = (props) => {
    return (
        <Form className='question-form'>
            <h2>Question {props.number}</h2>
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
}

export default QuestionForm;