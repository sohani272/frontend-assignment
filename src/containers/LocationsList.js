import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLocations, clearAllLocations, updateLocations, updateLocationData, getLocationData, resetNewLocation, resetLocationData } from '../actions/locationActions';
import { convertFahrenheitToCelsius } from '../common/helper';

class LocationsList extends Component {

    componentWillMount() {
        this.props.fetchLocations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newLocation && !nextProps.updatedLocationData) {
            if (nextProps.locations.length === 8) {
                nextProps.locations.unshift(nextProps.newLocation);
                nextProps.locations.pop();
            } else {
                nextProps.locations.unshift(nextProps.newLocation)
            }
        }

        if (nextProps.updatedLocationData !== this.props.updatedLocationData) {
            let data = nextProps.locations.map((location) => {
                if (location.id == nextProps.updatedLocationData.id) {
                    return nextProps.updatedLocationData;
                } else {
                    return location;
                }
            })
            this.props.updateLocations(data);
        }
    }

    deleteLocation = (locationId) => {
        let newLocations = [];
        if (this.props.locations && this.props.locations.length > 0) {
            newLocations = this.props.locations.filter(location => location.id != locationId);
            if (this.props.locations.length === 1) {
                this.props.resetLocationData();
            }
        }
        this.props.updateLocations(newLocations);
        this.props.resetNewLocation();
    }

    refreshLocationData = (locationId) => {
        this.props.updateLocationData(locationId);
    }

    clearAllLocations = () => {
        this.props.clearAllLocations();
        this.props.resetNewLocation();
    }

    getLocationData = (id) => {
        this.props.getLocationData(id);
    }

    render() {
        const locations = this.props.locations && this.props.locations.map(location => (
            <React.Fragment key={location.id}>
                <p className='locations-list'>
                    <div className='location-name' onClick={this.getLocationData.bind(this, location.id)} >
                        <span>{location.name + '  -  '}</span>
                        <span>{convertFahrenheitToCelsius(location.main && location.main.temp) + ' '}</span>
                        <span>{location.weather && location.weather.length > 0 ? location.weather[0].description.toUpperCase() : ''}</span>
                    </div>
                    <button className='action-icons' onClick={this.refreshLocationData.bind(this, location.id)}><span className='fa fa-refresh'></span></button>
                    <button className='action-icons' onClick={this.deleteLocation.bind(this, location.id)}><span className='fa fa-times' ></span></button>
                </p>
            </React.Fragment>
        ));
        return (
            <div className="recent-locations-container">
                <div >
                    <p className='recent-locatons-heading'>Recent Locations</p>
                    {locations && locations.length > 0 ? locations : <p>No Recent Locations</p>}
                </div>
                <div className="clear-all">
                    <button className='clear-all-button' disabled={this.props.locations && this.props.locations.length === 0} onClick={this.clearAllLocations}>CLEAR</button>
                </div>
            </div>
        );
    }
}

LocationsList.propTypes = {
    fetchLocations: PropTypes.func.isRequired,
    clearAllLocations: PropTypes.func.isRequired,
    updateLocations: PropTypes.func.isRequired,
    updateLocationData: PropTypes.func.isRequired,
    getLocationData: PropTypes.func.isRequired,
    resetNewLocation: PropTypes.func.isRequired,
    resetLocationData: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    newLocation: PropTypes.object,
    updatedLocationData: PropTypes.object
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    newLocation: state.locations.item,
    updatedLocationData: state.locations.updatedItem
})

export default connect(mapStateToProps, { fetchLocations, clearAllLocations, updateLocations, updateLocationData, getLocationData, resetNewLocation, resetLocationData })(LocationsList);
