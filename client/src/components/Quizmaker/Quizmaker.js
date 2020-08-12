import React, { useState } from "react";
import { withRouter } from "react-router";
import { Nav, Form, Row, Col, Container } from 'react-bootstrap';
import './Quizmaker.css'
import QuestionForm from './Components/QuestionForm';
import CompletedQuestion from './Components/CompletedQuestion'
import Sidebar from '../../components/sidebar.js';
import Rewards from '../Rewards/rewards.js'

let questionInc = 2;
let numQuestions = 0;

const Quizmaker = props => {
    const addQuestion = (qVal, a1Val, a2Val, a3Val, a4Val) => {
        const newQuestion = { 
            id: `question-${questionInc}`,
            questionVal: qVal,
            answer1Val: a1Val,
            answer2Val: a2Val,
            answer3Val: a3Val,
            answer4Val: a4Val,
        }
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
    }];
    
    const [questions, setQuestions] = useState(firstQuestion);

    const questionList = questions.map((question, index) => (
        <CompletedQuestion 
            id={question.id}
            key={question.id}
            number={index + 1}
            questionVal={question.questionVal}
            answer1Val={question.answer1Val}
            answer2Val={question.answer2Val}
            answer3Val={question.answer3Val}
            answer4Val={question.answer4Val}
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