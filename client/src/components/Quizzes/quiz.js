import React from 'react';
import '../../style/quizzes.css'
import { Card, Button } from 'react-bootstrap'

const AnswerChoice = (props) => {
    const answerNum = props.answerNum;

    function handleAnswerChange(e) {
        props.updateAnswer(e.target.value, answerNum);
    }

    return (
        <Card clasName="quiz-card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.data}</Card.Title>
                <Button variant="primary">Go to Quiz</Button>
            </Card.Body>
        </Card>
    )
}

export default AnswerChoice;


