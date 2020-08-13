import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice'

// Props: number, addQuestion, deleteQuestion, id
const QuestionForm = (props) => {
    const number = props.number;
    // State used to contain values of questions and 4 answers
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');

    function handleQuestionChange(e) {
        setQuestion(e.target.value);
    }

    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion(question, answer1, answer2, answer3, answer4);
        setQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
    }

    function updateAnswer(aVal, aNum) {
        switch(aNum) {
            case 1: setAnswer1(aVal); break;
            case 2: setAnswer2(aVal); break;
            case 3: setAnswer3(aVal); break;
            case 4: setAnswer4(aVal); break;
        }
    }

    function handleUpScrollClick(e) {
        e.preventDefault();
        window.scrollTo(0,document.body.scrollHeight);
    }
    
    return (
        <div id={props.id}>
            <Form className='question-form'>
                <h3>Add a Question</h3>
                <Form.Group>
                    <Form.Label srOnly>Enter a Question</Form.Label>
                    <Form.Control type='text' value={question} placeholder='Enter a Question' onChange={handleQuestionChange}/>
                </Form.Group>
                <Row>
                    <Col>
                        <AnswerChoice answerNum={1} value={answer1} updateAnswer={updateAnswer}/>
                    </Col>
                    <Col>
                        <AnswerChoice answerNum={3} value={answer3} updateAnswer={updateAnswer}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AnswerChoice answerNum={2} value={answer2} updateAnswer={updateAnswer}/>
                    </Col>
                    <Col>
                        <AnswerChoice answerNum={4} value={answer4} updateAnswer={updateAnswer}/>
                    </Col>
                </Row>
            <div>
                <Button
                    as='input'
                    type='submit'
                    value='Add this question'
                    variant='primary'
                    size='lg'
                    onClick={handleAddClick}/>
                <Button
                    className='form-down-scroll'
                    as='input'
                    type='button'
                    value='Scroll to bottom'
                    variant='info'
                    size='sm'
                    onClick={handleUpScrollClick}/>
            </div>
            </Form>
        </div>
    )
}

export default QuestionForm;