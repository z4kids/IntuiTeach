import React, {Component} from 'react';
import { Button, Card } from 'react-bootstrap';
import Quiz from './quiz.js'
import '../../style/quizzes.css'

let quiznum = 0;
class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: [],
        }
        this.quiz = this.quiz.bind(this);
    }

    quiz = (element) => {
        quiznum ++;
        // This is the element which creates the card. 
        let components = this.state.change;

        element = <Quiz data={quiznum}/>

        components.push(element);

        this.setState({
            change: components
        });
    }

    render() {
        return (
            <div>
                <div className="create-quiz">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Button onClick={this.quiz} className="form-btn">CREATE</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    {this.state.change.map(comp => (comp))}
                </div>
            </div>
        );
    }
}

export default Quizzes;