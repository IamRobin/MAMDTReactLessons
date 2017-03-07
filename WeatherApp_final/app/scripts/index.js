import React from 'react';
import ReactDOM from 'react-dom';

import fetch from 'isomorphic-fetch';
import config from './config';

import WeatherCard from './components/WeatherCard';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {reports:[], cities:['Maastricht,NL','London,UK'], cityInput:''};
	}
	componentWillMount(){
		this.fetchWeatherForAllCities();
	}
	updateCity(e) {
		this.setState({cityInput:e.target.value});
	}
	addCity(e) {
		e.preventDefault();
		const cities = this.state.cities;
		if(cities.indexOf(this.state.cityInput)===-1){
			cities.push(this.state.cityInput);
			this.setState({cities:cities});
			this.fetchWeatherForAllCities();
		}
	}
	fetchWeatherForAllCities() {
		const reports = [];		
		this.state.cities.forEach(city => {
			fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+config.api_key)
			.then(response => response.json())
			.then(data => {
				reports.push(data);
				this.setState({reports:reports});
			});
		});
	}
	render(){
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>Weather monitor</h1>
					<p>Search for current weather by city</p>
					<form className="inline-form" action="" method="" noValidate>
						<div className="form-group">
							<label htmlFor="city">City</label>
							<input name="city" className="form-control" onChange={this.updateCity.bind(this)} />
						</div>
						<button className="btn btn-primary" onClick={this.addCity.bind(this)}>Add</button>
					</form>
				</div>
				<div className="row">
					{
						this.state.reports.map((report,idx) => (
							<WeatherCard weather={report} key={idx} />	
						))
					}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	,document.getElementById('root')
);