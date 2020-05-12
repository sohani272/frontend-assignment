import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocation } from '../actions/locationActions';
import { toast } from 'react-toastify';

class AddLocations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: ''
        }
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.location !== '') {
            // check if the city name already exists
            let error = false;
            this.props.locations && this.props.locations.length > 0 && this.props.locations.map((location) => {
                if (location.name === this.state.location) {
                    toast.error("This city already exists.");
                    error = true;
                }
            });
            if (error === false) {
                this.props.addLocation(this.state.location);
            }

            this.setState({
                location: ''
            });

        } else {
            toast.error("Please enter a city name.");
        }

    }

    render() {
        return (
            <div className='add-location'>
                <form onSubmit={this.onSubmit}>
                    <input type='text' name='location' value={this.state.location} onChange={this.handleOnChange} placeholder='Type city name' autoComplete='off' />
                    <button type='submit'><span className="fa fa-plus add-icon"></span></button>
                </form>
            </div>
        )
    }
}

AddLocations.propTypes = {
    addLocation: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    locations: state.locations.items
})


export default connect(mapStateToProps, { addLocation })(AddLocations);
