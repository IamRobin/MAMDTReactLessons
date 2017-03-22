import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todo: props.todo};
    }
    toggleDone(event) {
        var currentTodo = this.state.todo;
        if (currentTodo.done) {
            currentTodo.done = false;
        } else {
            currentTodo.done = true;
        }
        this.setState({todo: currentTodo});
    }
    render() {
        return (
            <li>
                <input type="checkbox" onChange={this.toggleDone.bind(this)} />
                <span className={this.state.todo.done ? 'done' : ''} >{this.state.todo.text}</span>
            </li>
        );
    }
}

export default TodoItem;