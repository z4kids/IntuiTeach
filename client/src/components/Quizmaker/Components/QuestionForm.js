import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, completed
const QuestionForm = (props) => {
    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion();
        document.getElementById('form-fields').disabled = true;
    }

    return (
        <Form className='question-form'>
            <fieldset id='form-fields'>
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
            <Button as='input' type='submit' onClick={handleAddClick} value='Add Question' variant='primary' size='lg'/>
            </fieldset>
        </Form>
    )
}

export default QuestionForm;