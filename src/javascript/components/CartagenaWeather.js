import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Creators } from 'modules/ducks/weather';
import ReactLogo from 'assets/svg/react.svg';

class Main extends Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.props.getWeather( 'Cartagena,Col' );
  }

  render() {
    const { weatherData } = this.props;

    return (
      <div className='container'>
        <ReactLogo/>

        <div className='weather-card'>
          <p>
            <label>Temp:</label>
            {weatherData.temp}
          </p>
          <p>
            <label>Max Temp:</label>
            {weatherData.temp_max}
          </p>
          <p>
            <label>Humidity:</label>
            {weatherData.humidity}
          </p>
          <p>
            <label>Pressure:</label>
            {weatherData.pressure}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  const { weatherData } = state.weatherReducer;

  return { weatherData };
};

export default connect( mapStateToProps, {
  getWeather: Creators.getWeather
} )( Main );
