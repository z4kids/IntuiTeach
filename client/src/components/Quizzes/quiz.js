import React from 'react';
import '../../style/quizzes.css'
import { Card, Button } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Quiz = (props) => {

    return (
        <Card clasName="quiz-card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.data}</Card.Title>
                <Button variant="primary" href={`/quizmaker/${props.id}`}>Go to Quiz</Button>
            </Card.Body>
        </Card>
    )
}

export default Quiz;


