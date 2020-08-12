import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

const AnswerChoice = (props) => {
    const answerNum = props.answerNum; 

    function handleAnswerChange(e) {
        props.updateAnswer(e.target.value, answerNum);
    }

    return (
        <Form.Group>
            <Form.Label srOnly>Enter an Answer Choice</Form.Label>
            <Form.Control type='text' placeholder='Possible Answer' onChange={handleAnswerChange}/>
        </Form.Group>
    )
}

export default AnswerChoice;