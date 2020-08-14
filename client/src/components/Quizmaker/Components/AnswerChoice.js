import React, {useState} from 'react';
import { Form, Col} from 'react-bootstrap';

const AnswerChoice = (props) => {
    const answerNum = props.answerNum; 

    function handleAnswerChange(e) {
        props.updateAnswer(e.target.value, answerNum);
    }

    return (
    <Form.Row>
        <Col xs='auto'><p className='question-form-answer-number'>{`${answerNum}.`}</p></Col>
        <Col>
            <Form.Group>
                <Form.Label srOnly>{`Enter Answer Choice ${answerNum}`}</Form.Label>
                <Form.Control type='text' value={props.value} placeholder={`Answer Choice ${answerNum}`} onChange={handleAnswerChange}/>
            </Form.Group>
        </Col>
    </Form.Row>    
)
}

export default AnswerChoice;