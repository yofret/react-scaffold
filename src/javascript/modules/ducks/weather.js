import { createReducer, createActions } from 'reduxsauce';

// Action creators
const { Types, Creators } = createActions( {
  getWeather: ['city'],
  getWeatherSuccess: ['data'],
  getWeatherFailure: ['error']
}, {} );

export { Types, Creators };

// default State
const defaultState = {
  isFetching: false,
  weatherData: {},
  error: null
};

// Reducer Handlers
export default createReducer( defaultState, {
  [Types.GET_WEATHER]: ( state ) => {
    return {
      ...state,
      isFetching: true
    };
  },
  [Types.GET_WEATHER_SUCCESS]: ( state, action ) => {
    return {
      ...state,
      isFetching: false,
      weatherData: { ...action.data.main }
    };
  },
  [Types.GET_WEATHER_FAILURE]: ( state, action ) => {
    return {
      ...state,
      error: action.error,
      isLoading: false
    };
  }
} );
