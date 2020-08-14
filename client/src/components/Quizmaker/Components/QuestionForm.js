import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import AnswerChoice from './AnswerChoice';
import CorrectAnswerSelector from './CorrectAnswerSelector';

// Props: number, addQuestion, deleteQuestion, id
const QuestionForm = (props) => {
    const number = props.number;
    // State used to contain values of questions and 4 answers
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(1);

    //Updates state when input value is changed
    function handleQuestionChange(e) {
        setQuestion(e.target.value);
    }

    //Updates correct answer when button on CorrectAnswerSelector is pressed
    function selectCorrectAnswer(aNum) {
        setCorrectAnswer(aNum);
    }

    //Used when Add Question button is pressed
    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion(question, answer1, answer2, answer3, answer4, correctAnswer);
        //Reset input values to allow for new question
        setQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setCorrectAnswer(1);
    }

    //Changes state based on changes to AnswerChoice component
    function updateAnswer(aVal, aNum) {
        switch(aNum) {
            case 1: setAnswer1(aVal); break;
            case 2: setAnswer2(aVal); break;
            case 3: setAnswer3(aVal); break;
            case 4: setAnswer4(aVal); break;
        }
    }

    //Scrolls to bottom of page. Allows user to see last question
    function handleDownScrollClick(e) {
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
                        <AnswerChoice answerNum={2} value={answer2} updateAnswer={updateAnswer}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AnswerChoice answerNum={3} value={answer3} updateAnswer={updateAnswer}/>
                    </Col>
                    <Col>
                        <AnswerChoice answerNum={4} value={answer4} updateAnswer={updateAnswer}/>
                    </Col>
                </Row>
                    <CorrectAnswerSelector selectCorrectAnswer={selectCorrectAnswer}/>
            <div>
                <Button
                    as='input'
                    type='submit'
                    value='Add this question'
                    variant='primary'
                    size='lg'
                    onClick={handleAddClick}
                />
                <Button
                    className='form-down-scroll'
                    as='input'
                    type='button'
                    value='Scroll to bottom'
                    variant='info'
                    size='sm'
                    onClick={handleDownScrollClick}
                />
            </div>
            </Form>
        </div>
    )
}

export default QuestionForm;