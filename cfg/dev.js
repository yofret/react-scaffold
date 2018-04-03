'use strict';

let path = require( 'path' );
let webpack = require( 'webpack' );
let baseConfig = require( './base' );
let defaultSettings = require( './defaults' );

const env = process.env.REACT_WEBPACK_ENV;
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );

const autoprefixerOptions = {
  browsers: [
    'last 3 version',
    'ie >= 10'
  ]
};

let isDev = env === 'dev' ? true : false;
let isProd = env === 'dist' ? true : false;

let config = Object.assign( {}, baseConfig, {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './src/javascript/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin( 'client/style.css' ),
    new HtmlWebpackPlugin( {
      template: path.join( defaultSettings.srcPath, 'index.html' ),
      favicon: path.join( defaultSettings.srcPath, 'favicon.ico' ),
      path: defaultSettings.distPath,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        useShortDoctype: true
      }
    } ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
} );

// Add needed loaders to the defaults here
config.module.rules.push( {
  test: /\.(js|jsx)$/,
  use: ['react-hot-loader/webpack', 'babel-loader'],
  include: [ defaultSettings.srcPath ]
} );

config.module.rules.push( {
  test: /\.(scss|sass|css)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        minimize: isProd
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDev,
        plugins: () => [
          autoprefixer( autoprefixerOptions )
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: isDev }
    }
  ]
} );

module.exports = config;
