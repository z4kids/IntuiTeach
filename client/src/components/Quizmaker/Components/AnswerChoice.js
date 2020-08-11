import React from 'react';
import { Form } from 'react-bootstrap';

const AnswerChoice = (props) => (
    <Form.Group>
        <Form.Label srOnly>Enter an Answer Choice</Form.Label>
        <Form.Control type='text' placeholder='Possible Answer'/>
    </Form.Group>
)

export default AnswerChoice;