import React from 'react';

import icons from './weatherIcons';

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-xs-6 col-md-3">
        <div href="#" className="thumbnail">
          <img src={'http://openweathermap.org/img/w/'+this.props.weather.weather[0].icon+'.png'} alt="" />
          <div className="caption">
            <h3>{this.props.weather.name}</h3>
            <p>{this.props.weather.weather[0].description}</p>
            <p>The temperature in {this.props.weather.name} is {parseInt(this.props.weather.main.temp)}&deg;C. 
            There is a humidity of {this.props.weather.main.humidity}%.</p>
          </div>
        </div>  
      </div>
    );
  }
}

export default WeatherCard;