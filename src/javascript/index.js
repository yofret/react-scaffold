import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { render } from 'react-dom';
import Routes from 'router';
import createStore from 'store';

import 'styles/main.scss';

const { store, persistor } = createStore();

// Render the main component into the dom
const renderApp = Component => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component/>
      </PersistGate>
    </Provider>,
    document.getElementById( 'app' )
  );
};

renderApp( Routes );

if ( module.hot ) {
  module.hot.accept( './router', () => {
    const newRoutes = require( './router' ).default;
    renderApp( newRoutes );
  } );
}
