import React, {useState} from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const AnswerChoice = (props) => {
    const answerNum = props.answerNum; 

    function handleAnswerChange(e) {
        props.updateAnswer(e.target.value, answerNum);
    }

    return (
        <Row>
            <Col xs={1}>
                <Form.Check
                    aria-label=''
                    type="checkbox"
                    id={props.answerNum}
                    label=""
                    custom
                />
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label srOnly>Enter an Answer Choice</Form.Label>
                    <Form.Control type='text' value={props.value} placeholder='Possible Answer' onChange={handleAnswerChange}/>
                </Form.Group>
            </Col>
        </Row>
)
}

export default AnswerChoice;