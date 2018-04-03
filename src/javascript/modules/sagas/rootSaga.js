import { fork, all } from 'redux-saga/effects';
import createApi from 'common/api';
import createMockApi from 'common/fixtureApi';

// Import saga watchers
import { watchApp } from 'modules/sagas/appSaga';
import { watchWeather } from 'modules/sagas/weatherSaga';
import config from 'config';

const api = createApi();

// if enableAdapters is true, lets intercep all the api call to our mock API
if ( config.enableAdapters ) {
  createMockApi( api.axiosInstance );
}

export const apiInstance = api;

export default function* rootSaga() {
  yield all( [
    fork( watchApp ),
    fork( watchWeather, api )
  ] );
}
