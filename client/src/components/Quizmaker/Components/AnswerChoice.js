import React, {useState} from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const AnswerChoice = (props) => {
    const answerNum = props.answerNum; 

    function handleAnswerChange(e) {
        props.updateAnswer(e.target.value, answerNum);
    }

    return (
        <Form.Group>
            <Form.Label srOnly>{`Enter Answer Choice ${answerNum}`}</Form.Label>
            <Form.Control type='text' value={props.value} placeholder={`Answer Choice ${answerNum}`} onChange={handleAnswerChange}/>
        </Form.Group>
)
}

export default AnswerChoice;