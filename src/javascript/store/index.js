import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'modules';
import rootSaga from 'modules/sagas/rootSaga';
import config from 'config';
import loggerConfig from 'store/loggerConfig';

const isProducction = config.appEnv == 'dist';
const history = createHistory();

export { history };

// Create store
export default () => {
  let store = null;
  let persistor = null;
  let middleware = null;
  const sagaMiddleware = createSagaMiddleware();
  const routMiddleware = routerMiddleware( history );

  if ( isProducction ) {
    // Producction middlewares
    middleware = applyMiddleware( sagaMiddleware, routMiddleware );
  } else {
    // Filter out persit and router actions
    const logger = createLogger( loggerConfig );

    // Development middlewares
    middleware = applyMiddleware( sagaMiddleware, routMiddleware, logger );

    // Enable redux devtool if browser extension is installed
    if ( window.__REDUX_DEVTOOLS_EXTENSION__ ) {
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
  }

  store = createStore(
    rootReducer,
    middleware
  );

  sagaMiddleware.run( rootSaga );
  // begin periodically persisting the store
  persistor = persistStore( store, null, () => store.getState() );

  if ( module.hot ) {
    // Enable webpack hot module replacement for redux modules
    module.hot.accept( '../modules', () => {
      const nextRootReducer = require( '../modules/index' ).default;
      store.replaceReducer( nextRootReducer );
    } );
  }

  // Return store and persistor instance
  return { store, persistor };
};
