import React, {Component} from 'react';
import Quiz from './quiz.js'
import {Button, Card, Form } from 'react-bootstrap'
import '../../style/quizzes.css'

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: [],
            value:  ''
        }
        this.quiz = this.quiz.bind(this);
    }
    onChange = (event) => this.setState({ value: event.target.value });


    quiz = (element) => {
        //prevents page from refreshing
        element.preventDefault()
        // This is the element which creates the card. 
        let components = this.state.change;

        element = <Quiz data={this.state.value}/>

        components.push(element);

        this.setState({
            change: components
        });
    }

    render() {
        return (
            <div>
                <div className="form-div">
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                        <Form>
                            <Form.Label className="form-label">Enter Quiz Name</Form.Label>
                            <Form.Control type="text" value={this.state.value} onChange={this.onChange}/>
                            <Button type='submit' onClick={this.quiz} className="form-btn">Create this quiz</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className="quiz-wrapper">
                    {this.state.change.map(comp => (comp))}
                </div>
            </div>
        );
    }
}

export default Quizzes