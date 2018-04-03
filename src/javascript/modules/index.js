// import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import appReducer from 'modules/ducks/app';
import weatherReducer from 'modules/ducks/weather';
import { routerReducer } from 'react-router-redux';

const persistConfig  = {
  key: 'primary',
  storage
};

export default persistCombineReducers( persistConfig , {
  appReducer,
  weatherReducer,
  router: routerReducer
} );
