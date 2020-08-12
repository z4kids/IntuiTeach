import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, deleteQuestion, id
const CompletedQuestion = (props) => {
    const handleDeleteClick = () => {
        props.deleteQuestion(props.id);
    }
    
    return (
        <div className = 'question-viewer' id={props.id}>
            <Container className='question-form'>
                <h3>{`Question ${props.number}`}</h3>
                <Row>
                    <Col>
                        <ul>
                            <li>Answer 1</li>
                            <li>Answer 1</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li>Answer 1</li>
                            <li>Answer 1</li>
                        </ul>
                    </Col>
                </Row>
            <div>
                <Button as='input' type='button' onClick={handleDeleteClick} value='Delete question' variant='danger'/>
            </div>
            </Container>
        </div>
    )
}

export default CompletedQuestion;