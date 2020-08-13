import React, { useState, Component} from 'react';
import '../../style/rewards.css'
import { Button, Form, Container, Row, Col} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'

class Rewards extends React.Component {
    state = {
        rewards: ['Example']
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
                    <SubmitForm onFormSubmit={this.handleSubmit} />
                </div>
                <h2>Your Rewards</h2>
                <RewardsList rewards={this.state.rewards} onDelete={this.handleDelete} />
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
                <h3>Add Rewards</h3>
                <Form.Control
                    type='text'
                    className='input'
                    placeholder='Enter Rewards'
                    value={this.state.term}
                    onChange={(e) => this.setState({ term: e.target.value })}
                />
                <Button type="submit">Add this reward</Button>
            </Form>
        );
    }
}

const RewardsList = (props) => {
    const rewards = props.rewards.map((reward, index) => {
        return <Reward content={reward} key={index} id={index} onDelete={props.onDelete} />
    })
    return (
        <div className="reward-list">
            {rewards}
        </div>
    );
}

const Reward = (props) => {
    return (
        <div className='list-item'>
            {props.content}
            <Button variant="danger" className="right" size ='sm' onClick={() => { props.onDelete(props.id) }}>Delete</Button>
        </div>
    );
}

export default Rewards