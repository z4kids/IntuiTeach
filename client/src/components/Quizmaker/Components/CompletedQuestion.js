import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, deleteQuestion, id
const CompletedQuestion = (props) => {
    const handleDeleteClick = () => {
        props.deleteQuestion(props.id);
    }
    
    return (
        <Container fluid className = 'question-viewer'>
            <h3>{`Question ${props.number}: ${props.questionVal}`}</h3>
            <Row>
                <Col>
                    <ul>
                        <li>{`${props.answer1Val}`}</li>
                        <li>{`${props.answer2Val}`}</li>
                    </ul>
                </Col>
                <Col>
                    <ul>
                        <li>{`${props.answer3Val}`}</li>
                        <li>{`${props.answer4Val}`}</li>
                    </ul>
                </Col>
            </Row>
        <div>
            <Button as='input' type='button' onClick={handleDeleteClick} value='Delete question' variant='danger'/>
        </div>
        </Container>
    )
}

export default CompletedQuestion;