import React from 'react';
import '../../style/quizzes.css'
import { Card, Button, Row } from 'react-bootstrap'

const AnswerChoice = (props) => {
    const answerNum = props.answerNum;

    function handleAnswerChange(e) {
        props.updateAnswer(e.target.value, answerNum);
    }

    function handleDeleteClick() {
        props.deleteQuiz(props.id)
    }

    return (
        <Card className="quiz-card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.data}</Card.Title>
                    <Button variant="primary">Go to Quiz</Button>
                    <Button variant='danger' type='button' onClick={handleDeleteClick}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default AnswerChoice;


