import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { history } from 'store';
import { Switch, NavLink } from 'react-router-dom';
import { Route } from 'react-router';

import CartagenaWeather from 'components/CartagenaWeather';
import ChicagoWeather from 'components/ChicagoWeather';
import NewYorkWeather from 'components/NewYorkWeather';

// Using Fragments, Notice that this will not produce an extra div in the DOM, how cool is that?
const Routes = () => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <header className='header'>
        <NavLink to='/chicago'>Chicago</NavLink>
        <NavLink to='/newyork'>New York</NavLink>
        <NavLink to='/cartagena'>Cartagena</NavLink>
      </header>

      <Switch>
        <Route path={'/chicago'} component={ChicagoWeather}/>
        <Route path={'/newyork'} component={NewYorkWeather}/>
        <Route path={'/cartagena'} component={CartagenaWeather}/>
      </Switch>
    </React.Fragment>
  </ConnectedRouter>
);

export default Routes;
