import { takeLatest, put, call } from 'redux-saga/effects';
import { Creators, Types } from 'modules/ducks/weather';
import ExceptionHandler from 'common/ExceptionHandler';

export function* getWeather( api, action ) {
  try {
    const response = yield call( api.getWeatherByCityName, action.city );

    if ( !response.ok ) {
      ExceptionHandler.throwExceptionBasedOnResponse( response );
    }

    yield put( Creators.getWeatherSuccess( response.data ) );
  } catch ( e ) {
    yield put( Creators.getWeatherFailure( e.message ) );
  }
}

export function* watchWeather( api ) {
  yield takeLatest( Types.GET_WEATHER, getWeather, api );
}
