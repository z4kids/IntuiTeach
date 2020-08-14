import React, {useState} from 'react';
import { Button, ToggleButton, ButtonGroup,  Col, Row } from 'react-bootstrap';

const CorrectAnswerSelector = (props) => {
    //Button toolbar. Let's user select the correct answer
    const [buttonValue, setButtonValue] = useState(1);

    const buttons = [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
    ]

    function handleSelectChange(num) {
        props.selectCorrectAnswer(num);
        setButtonValue(num);
    }

    return (
        <Row className='question-form-answer-selector'>
            <Col xs='auto'>
                <p>What's the correct answer?</p>
            </Col>
            <Col xs='auto'>
                <ButtonGroup
                    toggle
                    id='button-group'>
                    {buttons.map((button, index) => (
                        <ToggleButton
                            key={index}
                            type='radio'
                            variant='secondary'
                            name='answer-choices'
                            value={button.value}
                            checked={buttonValue === button.value}
                            onChange={() => {handleSelectChange(button.value)}}
                        >{button.value}</ToggleButton>
                    ))}
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default CorrectAnswerSelector;