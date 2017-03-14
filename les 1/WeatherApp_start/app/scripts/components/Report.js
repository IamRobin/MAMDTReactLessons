import React from 'react';

class Report extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>{this.props.weather.name}</h2>
                <p>It is { this.props.weather.main ? Math.round(this.props.weather.main.temp) : 0 }&deg;C</p>
            </div>
        );
    }

}

export default Report;