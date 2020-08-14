import React from 'react';
import '../../style/quizzes.css'
import { Card, Button, Row } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Quiz = (props) => {

    function handleDeleteClick() {
        props.deleteQuiz(props.id)
    }

    return (
        <Card className="quiz-card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.data}</Card.Title>
                <Button variant="primary" href={`/quizmaker/${props.id}`}>Go to Quiz</Button>
                <Button variant='danger' type='button' onClick={handleDeleteClick}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default Quiz;


