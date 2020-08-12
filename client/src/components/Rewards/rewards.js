import React, { useState, Component} from 'react';
import './rewards.css'
import { Button, Form} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'

class Rewards extends React.Component {
    state = {
        rewards: ['test1']
    };

    handleSubmit = reward => {
        this.setState({ rewards: [...this.state.rewards, reward] });
    }

    handleDelete = (index) => {
        const newArr = [...this.state.rewards];
        newArr.splice(index, 1);
        this.setState({ rewards: newArr });
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='reward-form'>
                    <RewardsList rewards={this.state.rewards} onDelete={this.handleDelete} />
                    <SubmitForm onFormSubmit={this.handleSubmit} />
                </div>
            </div>
        );
    }
}


class SubmitForm extends React.Component {
    state = { term: '' };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.term === '') return;
        this.props.onFormSubmit(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Control
                    type='text'
                    className='input'
                    placeholder='Enter Rewards'
                    value={this.state.term}
                    onChange={(e) => this.setState({ term: e.target.value })}
                />
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}




const RewardsList = (props) => {
    const rewards = props.rewards.map((reward, index) => {
        return <Reward content={reward} key={index} id={index} onDelete={props.onDelete} />
    })
    return (
        <ListGroup>
            {rewards}
        </ListGroup>
    );
}

const Reward = (props) => {
    return (
        <ListGroup.Item className='list-item'>
            {props.content}
            <Button variant="warning" class="right" onClick={() => { props.onDelete(props.id) }}>Delete</Button>
        </ListGroup.Item>
    );
}

export default Rewards