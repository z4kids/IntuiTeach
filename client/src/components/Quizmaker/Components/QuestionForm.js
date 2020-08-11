import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, completed
const QuestionForm = (props) => {
    const number = props.number;

    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion();
        document.getElementById(`form-fields-${number}`).disabled = true;
    }

    function handleDeleteClick(e) {
        e.preventDefault();
        props.addQuestion();
    }
    
    return (
        <Form className='question-form'>
            <fieldset id={`form-fields-${number}`}>
                <h2>Question {number}</h2>
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
                <Row>
                    <Col>
                        <Button as='input' type='button' onClick={handleAddClick} value='Add Question' variant='primary' size='lg'/>
                        <Button as='input' type='button' onClick={handleDeleteClick} value='Delete Question' variant='danger' size='lg'/>
                    </Col>
                </Row>
            </fieldset>
        </Form>
    )
}

export default QuestionForm;