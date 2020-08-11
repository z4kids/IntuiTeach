import React from "react";
import { Nav, Button, ButtonToolbar, Form, Row, Col, FormLabel} from "react-bootstrap";
import { withRouter } from "react-router";
import './Quizmaker.css'
import ButtonControls from './Components/ButtonControls'
import QuestionForm from './Components/QuestionForm'


function addQuestion() {
    alert('Question added');
}
const questions = [{ number: 1, key:'form-1' }, { number: 2, key: 'form-2'}];
const questionList = questions.map((question) => (
    <QuestionForm 
        number={question.number}
        key={question.key} />
))

const Quizmaker = props => {
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