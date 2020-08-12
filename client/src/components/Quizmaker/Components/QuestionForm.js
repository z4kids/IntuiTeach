import React from 'react';
import { Form, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, deleteQuestion, id
const QuestionForm = (props) => {
    const number = props.number;

    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion();
        document.getElementById(`form-fields-${number}`).disabled = true;
    }

    const handleDeleteClick = () => {
        props.deleteQuestion(props.id);
    }
    
    return (
        <div id={`question-${number}`}>
            <Form className='question-form'>
                <fieldset id={`form-fields-${number}`}>
                    <h3>Add a Question</h3>
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
                </fieldset>
            <div>
                <Button as='input' type='submit' onClick={handleAddClick} value='Add Question' variant='primary' size='lg'/>
                <Button as='input' type='button' onClick={handleDeleteClick} value='Delete Question' variant='danger' size='lg'/>
            </div>
            </Form>
        </div>
    )
}

export default QuestionForm;