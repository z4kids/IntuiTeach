import React, { useState, Component} from 'react';
import '../../style/rewards.css'
import { Button, Form, Container, Row, Col} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { getRewards, createReward, deleteReward } from "../../api/link";

class Rewards extends React.Component {
    state = {
        rewards: []
    };
    componentDidMount() {
        getRewards(this.props.exam_id)
        .then(rewards => {
            console.log(rewards)
            this.setState({
                rewards
            })
        })
    }
    handleSubmit = async reward => {
        const {id} = await createReward(reward, 0, this.props.exam_id)
        const full_reward = {
            _id: id.toString(),
            name: reward,
            points: 0, 
            exam_id: this.props.exam_id
        }
        console.log(full_reward)
        this.setState({
            rewards: [...this.state.rewards, full_reward]
        })
    }

    handleDelete = (index) => {
        const newArr = [...this.state.rewards];
        deleteReward(this.state.rewards[index]._id)
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
        return <Reward content={reward.name} key={reward._id} index={index} onDelete={props.onDelete} />
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
            <Button variant="danger" className="right" size ='sm' onClick={() => { props.onDelete(props.index) }}>Delete</Button>
        </div>
    );
}

export default Rewards