import React from 'react';
import { Button, Col, Row, ButtonGroup } from 'react-bootstrap';

const CorrectAnswerSelector = (props) => {    
    function handleSelectClick(num) {
        props.selectCorrectAnswer(num);
    }

    return (
        <Row className='question-form-answer-selector'>
            <Col xs='auto'>
                <p>What's the correct answer?</p>
            </Col>
            <Col xs='auto'>
                <ButtonGroup
                    id='button-group'
                    label='Select correst answer'
                    variant='secondary'>

                    <Button as='input' type='button' value='1' onClick={() => handleSelectClick(1)}/>
                    <Button as='input' type='button' value='2' onClick={() => handleSelectClick(2)}/>
                    <Button as='input' type='button' value='3' onClick={() => handleSelectClick(3)}/>
                    <Button as='input' type='button' value='4' onClick={() => handleSelectClick(4)}/>
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default CorrectAnswerSelector;