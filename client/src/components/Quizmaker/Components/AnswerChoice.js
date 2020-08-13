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
            <Form.Check
                type="checkbox"
                id={props.answerNum}
                label=""
                custom
            />
            <Form.Control type='text' value={props.value} placeholder='Possible Answer' onChange={handleAnswerChange}/>
        </Form.Group>
    )
}

export default AnswerChoice;