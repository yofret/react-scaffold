'use strict';
let path = require( 'path' );
let defaultSettings = require( './defaults' );

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array

module.exports = {
  devtool: 'eval',
  output: {
    path: path.join( __dirname, '/../dist' ),
    filename: 'client/app.js',
    publicPath: '/'
  },
  devServer: {
    publicPath: '/',
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    noInfo: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      mockapi: `${defaultSettings.mockApiPath}`,
      common: `${defaultSettings.srcPath}/javascript/common/`,
      components: `${defaultSettings.srcPath}/javascript/components/`,
      router: `${defaultSettings.srcPath}/javascript/router/`,
      store: `${defaultSettings.srcPath}/javascript/store/`,
      modules: `${defaultSettings.srcPath}/javascript/modules/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      assets: `${defaultSettings.srcPath}/assets/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {}
};
