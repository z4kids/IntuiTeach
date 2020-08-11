import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Quizmaker.css'
import ButtonControls from './components/ButtonControls'
import QuestionForm from './components/QuestionForm'

let questionNum = 2;
const Quizmaker = props => {
    function addQuestion() {
        const newQuestion = { number: questionNum }
        setQuestions([...questions, newQuestion])
        questionNum++;
    }
    const firstQuestion = [{ number: 1 }];
    const [questions, setQuestions] = useState(firstQuestion);
    const questionList = questions.map((question) => (
    <QuestionForm 
        number={question.number}
        id={question.id}
        key={question.id}/>
    ))

    return (
        <div>
            <div className='question-maker'>
                <ButtonControls addQuestion={addQuestion}/>
                <div className='question-list'>
                    {questionList}
                </div>
                <ButtonControls addQuestion={addQuestion}/>
            </div>
        </div>
    );
};
export default Quizmaker;