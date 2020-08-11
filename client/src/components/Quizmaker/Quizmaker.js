import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { Row, Col, Container } from 'react-bootstrap';
import './Quizmaker.css'
import ButtonControls from './Components/ButtonControls'
import QuestionForm from './Components/QuestionForm'
import Sidebar from '../../components/sidebar.js';

let questionNum = 2;

const Quizmaker = props => {
    function addQuestion() {
        const newQuestion = { number: questionNum }
        setQuestions([...questions, newQuestion])
        questionNum++;
    }
    const firstQuestion = [{ number: 1, key:'form-1' }];
    const [questions, setQuestions] = useState(firstQuestion);
    const questionList = questions.map((question) => (
    <QuestionForm 
        number={question.number}
        key={question.key}/>
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
                            <ButtonControls addQuestion={addQuestion}/>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};
export default Quizmaker;