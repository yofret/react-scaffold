'use strict';

let path = require( 'path' );
let srcPath = path.join( __dirname, '/../src/' );
let svgPath = path.join( __dirname, '/../src/assets/svg' );
let mockApiPath = path.join( __dirname, '/../mockapi' );

module.exports = {
  devtool: 'eval',
  module: {
    rules: [
      {
        enforce: 'post',
        test: /\.(js|jsx)$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        include: [
          path.join( __dirname, '/../src' )
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        use: ['null-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [
          srcPath,
          path.join( __dirname, '/../test' )
        ]
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
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    alias: {
      mockapi: `${mockApiPath}`,
      helpers: path.join( __dirname, '/../test/helpers' ),
      components: `${srcPath}javascript/components/`,
      config: `${srcPath}javascript/config/`,
      modules: `${srcPath}javascript/modules/`,
      common: `${srcPath}javascript/common/`,
      styles: `${srcPath}styles/`,
      assets: `${srcPath}assets/`,
      env: `${srcPath}config/${process.env.REACT_WEBPACK_ENV}`
    }
  },
  plugins: []
};
