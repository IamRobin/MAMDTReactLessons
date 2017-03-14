import React from 'react';
import ReactDOM from 'react-dom';

import fetch from 'isomorphic-fetch';

import Report from './components/Report';

var apiKey = '4d8c9b82f1d2d2f2a6640a69e4236870';

var url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';


class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {weather: {}, reports: [], inputValue: ''};
	}
	handleInputUpdate (event) {
		this.setState({inputValue: event.target.value});
	}
	submitCity (event) {
		event.preventDefault();

		if (this.state.inputValue.length === 0) return;

		fetch( url + this.state.inputValue + '&appid=' + apiKey )
			.then((response) => {

				return response.json();

			})
			.then((data) => {
				var reportsArray = this.state.reports;

				reportsArray.push(data);

				this.setState({reports: reportsArray});
				console.log(this.state);

			});
	}
	render() {
		return (
			<div className="jumbotron">
				<h1>Hello World</h1>

				<p>Welcome to the weather app</p>
				<form>
					<div className="form">
						<input className="" onChange={this.handleInputUpdate.bind(this)} />
						<button onClick={this.submitCity.bind(this)} className="btn btn-default">Klik</button>
					</div>
				</form>
				{
					this.state.reports.map(function(report, index){
						return (<Report weather={report} key={index} />);
					})
				}

			</div>
		);
	}
}



ReactDOM.render(
	<App />
	,document.getElementById('root')
);