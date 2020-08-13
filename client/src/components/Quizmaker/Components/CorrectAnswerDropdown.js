import React from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

const CorrectAnswerDropdown = (props) => {    
    function handleSelectClick(num) {
        props.selectCorrectAnswer(num);
    }

    return (
        <DropdownButton 
            className='question-form-dropdown'
            id='answer-dropdown'
            title='Select correst answer'
            variant='secondary'>

            <Dropdown.Item as='input' type='button' value='Answer 1' onClick={() => handleSelectClick(1)}/>
            <Dropdown.Item as='input' type='button' value='Answer 2' onClick={() => handleSelectClick(2)}/>
            <Dropdown.Item as='input' type='button' value='Answer 3' onClick={() => handleSelectClick(3)}/>
            <Dropdown.Item as='input' type='button' value='Answer 4' onClick={() => handleSelectClick(4)}/>
        </DropdownButton>
    )
}

export default CorrectAnswerDropdown;