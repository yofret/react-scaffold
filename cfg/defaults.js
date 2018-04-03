/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require( 'path' );
const dfltPort = 8000;

// Paths
const srcPath = path.join( __dirname, '/../src' );
const assetsPath = path.join( __dirname, '/../src/assets' );
const svgPath = path.join( __dirname, '/../src/assets/svg' );
const fontPath = path.join( __dirname, '/../src/assets/fonts' );
const distPath = path.join( __dirname, '/../dist/client' );
const mockApiPath = path.join( __dirname, '/../mockapi' );

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: ['eslint-loader'],
        include: srcPath
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: true }],
                floatPrecision: 2
              }
            }
          }
        ],
        include: svgPath
      },
      {
        test: /\.(eot|svg|woff|woff2|ttf)$/,
        use: ['url-loader?limit=8192'],
        include: fontPath
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['url-loader?limit=8192'],
        include: assetsPath
      },
      {
        test: /\.(mp4|ogg)$/,
        use: ['file-loader'],
        include: assetsPath
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  svgPath: svgPath,
  fontPath: fontPath,
  distPath: distPath,
  mockApiPath: mockApiPath,
  publicPath: '/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
