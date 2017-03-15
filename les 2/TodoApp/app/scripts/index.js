import React from 'react';
import ReactDOM from 'react-dom';

import TodoItem from './components/TodoItem';

class App extends React.Component {

	componentWillMount() {
		this.setState({todoList: [], inputField: ''});
	}

	handleInput(event) {
		this.setState({inputField: event.target.value});
	}
	addTodo(event) {

		if(this.state.inputField.length === 0 || event.keyCode && event.keyCode !== 13) return;

		event.preventDefault();
		var newTodo = {
			text: this.state.inputField,
			created_at: new Date(),
			done: false
		};
		var todos = this.state.todoList;
		todos.push(newTodo);
		this.setState({todoList: todos, inputField: ''});
	}

	render() {
		return (
			<div>
				<ul>
					{
						this.state.todoList.map(function(todo, index){
							return (
								<TodoItem todo={todo} key={index} />
							);
						})
					}
				</ul>
				<div>
					<label htmlFor="newTodo">Add Todo item</label>
					<input name="newTodo" value={this.state.inputField} type="text" onKeyUp={this.addTodo.bind(this)} onChange={this.handleInput.bind(this)} />
					<button type="button" onClick={this.addTodo.bind(this)} >Add</button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);