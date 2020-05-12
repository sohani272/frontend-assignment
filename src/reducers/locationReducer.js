import { FETCH_LOCATIONS, ADD_LOCATION, CLEAR_ALL_LOCATIONS, UPDATE_LOCATIONS, UPDATE_LOCATION_DATA, LOCATION_WEATHER_DATA, RESET_NEW_LOCATION, RESET_LOCATION_DATA } from '../common/constants';

const initialState = {
    items: [],
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                items: state.items
            };
        case ADD_LOCATION:
            return {
                ...state,
                item: action.payload
            };
        case CLEAR_ALL_LOCATIONS:
            return {
                ...state,
                items: []
            };
        case UPDATE_LOCATIONS:
            return {
                ...state,
                items: action.payload
            };
        case UPDATE_LOCATION_DATA:
            return {
                ...state,
                updatedItem: action.payload
            };
        case LOCATION_WEATHER_DATA:
            return {
                ...state,
                weatherData: action.payload
            };
        case RESET_NEW_LOCATION:
            return {
                ...state,
                item: undefined
            };
        case RESET_LOCATION_DATA:
            return {
                ...state,
                weatherData: undefined
            };
        default:
            return state;
    }
}