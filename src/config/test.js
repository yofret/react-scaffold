'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',
  baseApiURL: 'api.openweathermap.org/data/2.5/'
};

export default Object.freeze( Object.assign( baseConfig, config ) );
