import { FETCH_LOCATIONS, ADD_LOCATION, CLEAR_ALL_LOCATIONS, UPDATE_LOCATIONS, UPDATE_LOCATION_DATA, LOCATION_WEATHER_DATA, RESET_NEW_LOCATION, RESET_LOCATION_DATA } from '../common/constants';
import axios from 'axios';
import { APPID, BASE_URL, WEATHER_API, FORECAST_API } from '../common/config';
import { toast } from 'react-toastify';

export const fetchLocations = () => dispatch => {
  dispatch({
    type: FETCH_LOCATIONS
  })
}

export const addLocation = (cityName) => dispatch => {
  axios.get(`${BASE_URL}${WEATHER_API}?q=${cityName}&appid=${APPID}`)
    .then(function (response) {
      if (response && response.status === 200) {
        dispatch({
          type: ADD_LOCATION,
          payload: response.data
        })
      }
    })
    .catch(function (error) {
      if (error.response && error.response.data) {
        toast.error("Please enter a valid city name");
      }
    })
}

export const updateLocations = (locations) => dispatch => {
  dispatch({
    type: UPDATE_LOCATIONS,
    payload: locations
  })
}

export const updateLocationData = (cityId) => dispatch => {
  axios.get(`${BASE_URL}${WEATHER_API}?id=${cityId}&appid=${APPID}`)
    .then(function (response) {
      if (response && response.status === 200) {
        dispatch({
          type: UPDATE_LOCATION_DATA,
          payload: response.data
        })
      }
    })
    .catch(function (error) {
      if (error.response && error.response.data) {
        toast.error("Something went wrong. Please try again later.");
      }
    })
}

export const getLocationData = (cityId) => dispatch => {
  axios.get(`${BASE_URL}${FORECAST_API}?id=${cityId}&appid=${APPID}`)
    .then(function (response) {
      if (response && response.status === 200) {
        dispatch({
          type: LOCATION_WEATHER_DATA,
          payload: response.data
        })
      }
    })
    .catch(function (error) {
      if (error.response && error.response.data) {
        toast.error("Something went wrong. Please try again later.");
      }
    })
}

export const clearAllLocations = () => dispatch => {
  dispatch({
    type: CLEAR_ALL_LOCATIONS
  })
}

export const resetNewLocation = () => dispatch => {
  dispatch({
    type: RESET_NEW_LOCATION
  })
}

export const resetLocationData = () => dispatch => {
  dispatch({
    type: RESET_LOCATION_DATA
  })
}