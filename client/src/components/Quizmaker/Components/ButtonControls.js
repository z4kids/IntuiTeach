import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

const ButtonControls = (props) => {    
    function handleAddClick(e) {
        e.preventDefault();
        props.addQuestion();
    }
    return (
        <div id={props.id}>
            <ButtonToolbar className='button-toolbar' aria-label="Quiz controls">
                <Button as='input' type='submit' onClick={handleAddClick} value='Add Question' variant='light' size='lg'/>
            </ButtonToolbar>
        </div> 
    )
}

export default ButtonControls;