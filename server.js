/*eslint no-console:0 */
'use strict';
require( 'core-js/fn/object/assign' );
const http = require( 'http' );
const express = require( 'express' );
const webpack = require( 'webpack' );
const webpackDevMiddlewre = require( 'webpack-dev-middleware' );
const webpackHotMiddlewre = require( 'webpack-hot-middleware' );
const historyApiFallback = require( 'connect-history-api-fallback' );
const config = require( './webpack.config' );

const app = express();

// plugins
const DashboardPlugin = require( 'webpack-dashboard/plugin' );

/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
let isInitialCompilation = true;
const compiler = webpack( config );

compiler.apply( new DashboardPlugin() );

// 1) Attach history API fallback
// 2) Attach the dev middleware to the compiler & the server conf
// 3) Attach the hot middleware to the compiler & the server conf
app.use( historyApiFallback( { verbose: false } ) );
app.use( webpackDevMiddlewre( compiler, config.devServer ) );
app.use( webpackHotMiddlewre( compiler, {
  path: '/__webpack_hmr'
} ) );

if ( require.main === module ) {
  var server = http.createServer( app );
  server.listen( config.devServer.port, 'localhost', ( err ) => {
    if ( err ) {
      console.log( err );
    }
    console.log( 'Listening at localhost:' + config.devServer.port );
  } );
}

compiler.plugin( 'done', () => {
  if ( isInitialCompilation ) {
    // Ensures that we log after webpack printed its stats (is there a better way?)
    setTimeout( () => {
      console.log( '\n✓ The bundle is now ready for serving!\n' );
      console.log( '  Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + config.devServer.port + '/\n' );
      console.log( '  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.' );
    }, 350 );
  }
  isInitialCompilation = false;
} );
