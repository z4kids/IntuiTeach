import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { Form, Row, Col, Container } from 'react-bootstrap';
import './Quizmaker.css'
import QuestionForm from './Components/QuestionForm';
import CompletedQuestion from './Components/CompletedQuestion'
import Sidebar from '../../components/sidebar.js';
import Rewards from '../Rewards/rewards.js'

let questionInc = 2;
let numQuestions = 0;

const Quizmaker = props => {
    const addQuestion = () => {
        const newQuestion = { number: questionInc, id: `question-${questionInc}` }
        setQuestions([...questions, newQuestion])
        // document.getElementById('buttons').scrollIntoView();
        questionInc++;
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

    const questionList = questions.map((question, index) => (
        <CompletedQuestion 
            id={question.id}
            key={question.id}
            number={index + 1}
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
                            <Rewards />
                            <div>
                                <QuestionForm addQuestion={addQuestion} id='question-form'/>
                            </div>
                            <div className='question-list'>
                                <h2>Your Questions</h2>
                                {questionList}
                            </div>
                        </div>
                        
                    </Col>
                </Row>

            </Container>
        </div>
    );
};
export default Quizmaker;