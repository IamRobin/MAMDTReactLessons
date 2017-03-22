import React from 'react';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({answer: props.previousAnswer});
    }
    positiveAnswerClicked(event) {
        if(this.state.answer === 1) return;
        this.setState({answer: 1});
        this.props.registerAnswer(1, this.props.phase, this.props.index);
    }
    negativeAnswerClicked(event) {
        if(this.state.answer > 0) {
            this.props.registerAnswer(-1, this.props.phase, this.props.index);
        } else {
            this.props.registerAnswer(0, this.props.phase, this.props.index);
        }
        this.setState({answer: 0});
    }
    render() {
        return (
            <div>
                <p>{this.props.question.questionText}</p>
                <button className={this.state.answer === 1 ? 'btn btn-success' : 'btn btn-default'} onClick={this.positiveAnswerClicked.bind(this)} type="button">Wel</button>
                <button className={this.state.answer === 0 ? 'btn btn-danger' : 'btn btn-default'} onClick={this.negativeAnswerClicked.bind(this)} type="button">Niet</button>
            </div>
        );
    }
}

export default Question;