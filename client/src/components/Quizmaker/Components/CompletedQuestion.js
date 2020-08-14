import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, deleteQuestion, id
const CompletedQuestion = (props) => {
    const handleDeleteClick = () => {
        props.deleteQuestion(props.id);
    }
    
    return (
        <Container fluid className='question-viewer'>
            <h3>{`Question ${props.number}: ${props.questionVal}`}</h3>
            <Row>
                <Col>
                    <ul>
                        <li className={props.correctAnswer === 1 ? 'correct-answer' : undefined}>{`${props.answer1Val}`}</li>
                        <li className={props.correctAnswer === 3 ? 'correct-answer' : undefined}>{`${props.answer3Val}`}</li>
                    </ul>
                </Col>
                <Col>
                    <ul>
                        <li className={props.correctAnswer === 2 ? 'correct-answer' : undefined}>{`${props.answer2Val}`}</li>
                        <li className={props.correctAnswer === 4 ? 'correct-answer' : undefined}>{`${props.answer4Val}`}</li>
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