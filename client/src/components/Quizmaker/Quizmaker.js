import React, { useState } from "react";
import { withRouter } from "react-router";
import { Nav, Button, Row, Col, Container } from 'react-bootstrap';
import '../../style/Quizmaker.css'
import QuestionForm from './Components/QuestionForm';
import CompletedQuestion from './Components/CompletedQuestion'
import Sidebar from '../../components/sidebar.js';
import Rewards from '../Rewards/rewards.js'

let questionInc = 2;
let numQuestions = 0;

const Quizmaker = props => {
    const addQuestion = (qVal, a1Val, a2Val, a3Val, a4Val, corAns) => {
        const newQuestion = { 
            id: `question-${questionInc}`,
            questionVal: qVal,
            answer1Val: a1Val,
            answer2Val: a2Val,
            answer3Val: a3Val,
            answer4Val: a4Val,
            correctAnswer: corAns
        }

        if (questionInc === 2) {
            setQuestions([newQuestion])
        } else {
            setQuestions([...questions, newQuestion])
        }
        // document.getElementById('buttons').scrollIntoView();
        questionInc++;
    }
    const deleteQuestion = (id) => {
        const remainingQuestions = questions.filter(question => id !== question.id);
        setQuestions(remainingQuestions);
    }

    function handleUpScrollClick(e) {
        e.preventDefault();
        window.scrollTo(0,500);
    }

    const defaultQuestion = [{
        id: 'default',
        number: 0,
        questionVal: 'This is an example',
        answer1Val: 'Your answers will be displayed here',
        answer2Val: 'Every question has one correct answer, indicated by a checkmark',
        answer3Val: 'You can add up to 4 answer choices',
        answer4Val: 'If you need to change this question, delete this one and add a new question',
        correctAnswer: 2
    }];
    const [questions, setQuestions] = useState(defaultQuestion);
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
            correctAnswer={question.correctAnswer}
            deleteQuestion={deleteQuestion}
        />
    ));

    return (
        <div class="background">
            <Container fluid>
                <Row>
                    <Col xs={1} id="no-padding" className="fixed">
                        <Sidebar />
                    </Col>
                    <Col xs={11}>
                        <div className='question-maker'>
                            <Rewards/>
                            <h1>Questions</h1>
                            <div>
                                <QuestionForm
                                    addQuestion={addQuestion}
                                    id='question-form'/>
                            </div>
                            <div className='question-list'>
                                <h2>Your Questions</h2>
                                {questionList}
                            </div>
                            <Button
                                className='form-up-scroll'
                                as='input'
                                type='button'
                                value='Scroll to top'
                                variant='info'
                                size='sm'
                                onClick={handleUpScrollClick}
                            />
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};
export default Quizmaker;