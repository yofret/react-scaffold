'use strict';

import baseConfig from './base';

// Development values
let config = {
  appEnv: 'dev',
  baseApiURL: 'https://api.openweathermap.org/data/2.5/',
  appKey: 'ed748e11c0eb43ce392fa894cc1659c5',
  enableAdapters: false
};

export default Object.freeze( Object.assign( {}, baseConfig, config ) );
