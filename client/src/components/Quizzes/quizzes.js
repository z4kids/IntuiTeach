import React, {Component} from 'react';
import Quiz from './quiz.js'
import {Button, Card, Form } from 'react-bootstrap'
import '../../style/quizzes.css'
import { getExams, createExam, deleteExam } from "../../api/link";

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            value:  ''
        }
        this.quiz = this.quiz.bind(this);
    }
    componentDidMount() {
        getExams()
        .then(exams => {
            console.log(exams)
            this.setState({
                quizzes: exams
            })
        })
    }
    onChange = (event) => this.setState({ value: event.target.value });

    //cretes new id for new quizzes
    quizInc = 1;

    quiz = async (element) => {
        //prevents page from refreshing
        element.preventDefault()
        // This is the element which creates the card. 
        let components = this.state.quizzes;

        //let element = <Quiz data={this.state.value}/>
        const {id} = await createExam(this.state.value)

        components.push({id, name: this.state.value});

        this.setState({
            quizzes: components,
            value: ''
        });
        this.quizInc++;
    }
    deleteQuiz = async (id) => {
        console.log(0);
        let components = this.state.quizzes;
        await deleteExam(id)
        console.log(components)
        let remainingComponents = components.filter(element => id !== element.id);
        this.setState({quizzes: remainingComponents});
    }
    
    render() {
        return (
            <div>
                <div className="form-div">
                    <Card className='form' style={{ width: '20rem' }}>
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
                    {this.state.quizzes.map(comp => (<Quiz data={comp.name} key={comp.id} id={comp.id} deleteQuiz={this.deleteQuiz}/>))}
                </div>
            </div>
        );
    }
}

export default Quizzes