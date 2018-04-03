/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import env from 'env';

describe( 'appEnvConfigTests', function () {
  it( 'should load app config file depending on current --env', function () {
    expect( env.appEnv ).to.equal( 'test' );
  } );
} );
