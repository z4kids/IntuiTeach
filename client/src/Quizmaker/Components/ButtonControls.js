import React, { useState } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";

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

export default ButtonControls;