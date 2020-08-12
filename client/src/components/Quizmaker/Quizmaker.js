import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { Form, Row, Col, Container } from 'react-bootstrap';
import './Quizmaker.css'
import QuestionForm from './Components/QuestionForm'
import Sidebar from '../../components/sidebar.js';
import Rewards from '../Rewards/rewards.js'
let questionNum = 2;

const Quizmaker = props => {
    const addQuestion = () => {
        const newQuestion = { number: questionNum, id: `question-${questionNum}` }
        setQuestions([...questions, newQuestion])
        // document.getElementById('buttons').scrollIntoView();
        questionNum++;
    }

    const deleteQuestion = (id) => {
        const remainingQuestions = questions.filter(question => id !== question.id);
        setQuestions(remainingQuestions);
        console.log(id);
    }
    
    const firstQuestion = [{
        id: `question-${1}`,
        number: 1
    }];
    const [questions, setQuestions] = useState(firstQuestion);

    const questionList = questions.map((question) => (
        <QuestionForm 
            id={question.id}
            key={question.id}
            number={question.number}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
        />
    ))

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={1} id="no-padding">
                        <Sidebar />
                    </Col>
                    <Col xs={11} className="scroll">
                        
                        
                        <div className='question-maker'>
                            <ButtonControls addQuestion={addQuestion}/>
                            <div className='question-list'>
                                {questionList}
                            </div>
                        </div>
                        <Rewards />
                    </Col>
                </Row>

            </Container>
        </div>
    );
};
export default Quizmaker;