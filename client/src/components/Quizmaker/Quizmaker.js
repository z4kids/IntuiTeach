import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { Nav, Button, Row, Col, Container } from 'react-bootstrap';
import '../../style/Quizmaker.css'
import QuestionForm from './Components/QuestionForm';
import CompletedQuestion from './Components/CompletedQuestion'
import Sidebar from '../../components/sidebar.js';
import Rewards from '../Rewards/rewards.js'
import { getQuestions, createQuestion, deleteQuestion as delQ } from "../../api/link";

//Increments to create unique form ids
let questionInc = 2;

const Quizmaker = props => {
    const {id: exam_id} = useParams()
    
    const addQuestion = async (qVal, a1Val, a2Val, a3Val, a4Val, corAns) => {
        const newQuestion = { 
            id: `question-${questionInc}`,
            questionVal: qVal,
            answer1Val: a1Val,
            answer2Val: a2Val,
            answer3Val: a3Val,
            answer4Val: a4Val,
            correctAnswer: corAns
        }
        const options = [a1Val, a2Val, a3Val, a4Val]
        const response = await createQuestion(qVal, options, options[corAns-1], 0, 0, exam_id)
        newQuestion.id = response.id
        setQuestions([...questions, newQuestion])

    }
    const deleteQuestion = (id) => {
        if (delQ(id, exam_id)) {
            const remainingQuestions = questions.filter(question => id !== question.id);
            setQuestions(remainingQuestions);
            console.log(questions[0]);
        }
    }

    //Scrolls up to the question form
    function handleUpScrollClick(e) {
        e.preventDefault();
        window.scrollTo(0,500);
    }

    //Displays a default question, with instructions for the user
    const defaultQuestion = [{
        id: 'default',
        questionVal: 'This is an example',
        answer1Val: 'Your answers will be displayed here',
        answer2Val: 'Every question has one correct answer, indicated by a checkmark',
        answer3Val: 'You can add up to 4 answer choices',
        answer4Val: 'If you need to change this question, delete this one and add a new question',
        correctAnswer: 2
    }];
    const [questions, setQuestions] = useState(defaultQuestion);

    //Get all the questions for this exam
    useEffect(() => {
        getQuestions(exam_id)
        .then(qs => {
            console.log(qs)
            let new_questions = []
            if (qs.length > 0) {
                qs.forEach(question => {
                    const new_question = {
                        id: question._id,
                        questionVal: question.prompt,
                        answer1Val: question.options[0],
                        answer2Val: question.options[1],
                        answer3Val: question.options[2],
                        answer4Val: question.options[3],
                        correctAnswer: question.options.indexOf(question.correct)+1
                    }
                    new_questions.push(new_question)
                })
            setQuestions(new_questions)
            }
        })
    }, [])

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
                            <Rewards exam_id={exam_id}/>
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