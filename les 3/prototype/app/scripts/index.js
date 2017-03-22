import React from 'react';
import ReactDOM from 'react-dom';

import Question from './components/Question';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {result: {}};
    }
    componentWillMount() {
        var questions = {
            fase1: [
                {questionText: 'Ben je zwanger?', hasWeight: false},
                {questionText: 'Tekenen van depressie?', hasWeight: true},
                {questionText: 'Vraag 3', hasWeight: false},
                {questionText: 'Vraag 4', hasWeight: false}
            ],
            fase2: [
                {questionText: 'Ben je niet zwanger?', hasWeight: true},
                {questionText: 'Tekenen van depressie?', hasWeight: false},
                {questionText: 'Vraag 3', hasWeight: false},
                {questionText: 'Vraag 4', hasWeight: true}
            ],
            fase3: [
                {questionText: 'Ben je zwanger?', hasWeight: false},
                {questionText: 'Tekenen van depressie?', hasWeight: false},
                {questionText: 'Vraag 3', hasWeight: true},
                {questionText: 'Vraag 4', hasWeight: false}
            ]
        };
        this.setState({questions: questions, currentPhase: 'fase1'});
    }
    registerAnswer(answer, phase, questionIndex) {

        var currentResult = this.state.result;
        if(currentResult.hasOwnProperty(phase)) {
            currentResult[phase].total += answer;
        } else {
            currentResult[phase] = {
                total: answer,
                answers: []
            };
        }
        currentResult[phase].answers[questionIndex] = answer === -1 ? 0 : answer;
        this.setState({result: currentResult});
        console.log(this.state);
    }

    nextPhase() {
        var phases = Object.keys(this.state.questions);
        var index = phases.indexOf(this.state.currentPhase);
        if (index < phases.length - 1) {
            index++;
            this.setState({currentPhase: phases[index]});
        }
    }
    previousPhase() {
        var phases = Object.keys(this.state.questions);
        var index = phases.indexOf(this.state.currentPhase);
        if (index !== 0) {
            index--;
            this.setState({currentPhase: phases[index]});
        }
    }

	render() {
		return (
			<div className="container">
				<div className="jumbotron">
                    {
                        this.state.questions[this.state.currentPhase].map((question, index) => {
                            var previousAnswer = '';
                            if (this.state.result && this.state.result[this.state.currentPhase]) {
                                previousAnswer = this.state.result[this.state.currentPhase].answers[index];

                            }
                            return (
                                <Question key={this.state.currentPhase + '-' + index} index={index} previousAnswer={previousAnswer} question={question} phase={this.state.currentPhase} registerAnswer={this.registerAnswer.bind(this)} />
                            );
                        })
                    }
                    <button className="btn btn-default" onClick={this.previousPhase.bind(this)} type="button">Vorige</button>
                    <button className="btn btn-default" onClick={this.nextPhase.bind(this)} type="button">Volgende</button>
                </div>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);