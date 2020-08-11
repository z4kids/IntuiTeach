import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import './Quizmaker.css'
import ButtonControls from './Components/ButtonControls'
import QuestionForm from './Components/QuestionForm'

const Quizmaker = props => {
    function addQuestion() {
        const newQuestion = { number: 1, key: 'form 1'}
        setQuestions([...questions, newQuestion])
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
            <ButtonControls addQuestion={addQuestion}/>
            <div className='question-list'>
                {questionList}
            </div>
        </div>
    );
};
export default Quizmaker;