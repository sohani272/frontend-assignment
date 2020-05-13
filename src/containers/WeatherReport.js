import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocationData } from '../actions/locationActions';
import { convertFahrenheitToCelsius, getWeekDay, getWeatherIcon } from '../common/helper';

class WeatherReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: {},
            fiveDaysWeatherReport: [],
            monthDate: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.locationWeatherData) {
            let weatherList = nextProps.locationWeatherData.list ? nextProps.locationWeatherData.list : [];
            let fiveDaysWeatherReport = weatherList.length > 0 && weatherList.filter((e, i) => i % 8 === 7);

            this.setState({
                city: nextProps.locationWeatherData.city,
                fiveDaysWeatherReport: fiveDaysWeatherReport
            })
            let locationData = {};
            if (nextProps && nextProps.locations && nextProps.locations.length > 0) {
                locationData = nextProps.locations.find((item) => item.id === nextProps.locationWeatherData.city.id);
                this.setState({
                    locationData: locationData
                })
            }
        }
    }

    getDate(date) {
        let d = new Date(date);
        let monthDate = d.getDate();
        return monthDate;
    }

    getDayFromDate(date) {
        let d = new Date(date);
        let day = d.getDay();
        return getWeekDay(day);
    }

    refreshLocationData = (locationId) => {
        if (this.props && this.props.locationWeatherData && this.props.locationWeatherData.city) {
            this.props.getLocationData(this.props.locationWeatherData.city.id);
        }
    }

    render() {
        return (
            <div className='weather-report-container'>
                {this.props.locationWeatherData === undefined ? <div className='display-message'>
                    <h2>Location Weather Details will load here</h2>
                </div> :
                    <React.Fragment>
                        <div className='weather-detail'>
                            <h2>{this.state.city && this.state.city.name}</h2>
                            <button onClick={this.refreshLocationData} className={this.state.locationData ? '' : 'display-refresh-icon'}><span className='fa fa-refresh'></span></button>
                        </div>
                        <div className='weather-icon'>
                            <div className='weather-image'>
                                {this.state.locationData && this.state.locationData.weather && this.state.locationData.weather.length > 0 ? <img src={require(`../assets/images/${getWeatherIcon(this.state.locationData.weather[0].icon)}`)} /> : <div></div>}
                            </div>
                            <div>
                                <p>{convertFahrenheitToCelsius(this.state.locationData && this.state.locationData.main && this.state.locationData.main.temp)}</p>
                                <p>{this.state.locationData && this.state.locationData.weather && this.state.locationData.weather.length > 0 ? this.state.locationData.weather[0].description : ''}</p>
                                <p>{this.state.locationData && this.state.locationData.main ? 'Pressure: ' + ' ' + this.state.locationData.main.pressure : ''}</p>
                                <p>{this.state.locationData && this.state.locationData.wind ? 'Wind:' + ' ' + this.state.locationData.wind.speed : ''}</p>
                            </div>
                        </div>
                        {this.props.locationWeatherData !== undefined ?  <div className='weather-report-days'>
                            {this.state.fiveDaysWeatherReport && this.state.fiveDaysWeatherReport.length > 0 ?
                                this.state.fiveDaysWeatherReport.map((report, index) => {
                                    return (
                                        <div key={index} className='five-days-report'>
                                            <p>{this.getDate(report.dt_txt)}</p>
                                            <p>{this.getDayFromDate(report.dt_txt)}</p>
                                            {report && report.weather && report.weather.length > 0 ? 
                                                <img src={require(`../assets/images/${getWeatherIcon(report.weather[0].icon)}`)} /> 
                                                : <div></div>
                                            } 
                                           {report.main && report.main.temp ? <p>{convertFahrenheitToCelsius(report.main.temp)}</p> : null}
                                        </div>
                                    );
                                }) : ''}
                        </div> : null }
                    </React.Fragment>
                }
            </div>
        )
    }
}

WeatherReport.propTypes = {
    locations: PropTypes.array.isRequired,
    getLocationData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    locationWeatherData: state.locations.weatherData
})

export default connect(mapStateToProps, { getLocationData })(WeatherReport);
