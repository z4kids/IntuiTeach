import React from "react";
import { Nav, Button, ButtonToolbar, Form, Row, Col, FormLabel} from "react-bootstrap";
import { withRouter } from "react-router";
import './Quizmaker.css'

const ButtonControls = (props) => {    
    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion();
    }
    return (
        <ButtonToolbar  className='quiz-controls' aria-label="Quiz controls">
            <Button as='input' type='submit' onClick={handleAddClick} value='Add Question' variant='light' size='lg'/>
            <Button variant='primary' size='lg'>Save</Button>
        </ButtonToolbar>
    )
}

const AnswerChoice = (props) => (
    <Form.Group>
        <Form.Label srOnly>Enter an Answer Choice</Form.Label>
        <Form.Control type='text' placeholder='Possible Answer'/>
    </Form.Group>
)
const QuestionForm = (props) => {
    return (
        <Form className='question-form'>
            <h2>Question {props.number}</h2>
            <Form.Group>
                <Form.Label srOnly>Enter a Question</Form.Label>
                <Form.Control type='text' placeholder='Enter a Question'/>
            </Form.Group>
            <Row>
                <Col>
                    <AnswerChoice/>
                </Col>
                <Col>
                    <AnswerChoice/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AnswerChoice/>
                </Col>
                <Col>
                    <AnswerChoice/>
                </Col>
            </Row>
        </Form>
    )
}

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