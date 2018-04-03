## Technologies, Frameworks
- React
- React Router
- Redux
- Redux Saga ( Replacing Thunks for Sagas to handle our asyn action in separate layer )
- Redux Persist
- Redux Dev Tools support ( Requires browser extension )
- Redux Logger
- Webpack 3
- Hot Module Replacement
- Babel
- SASS with autoprefixer
- Webpack Dashboard
- ESLINT

## Automated Testing
- Karma
- Chai
- Headless chrome
- Enzyme (React shallow render)

## Leverage these
- [Redux Suace](https://github.com/infinitered/reduxsauce).
- [Lodash](https://lodash.com/).
- [Moment](https://momentjs.com/docs/).
- [Classnames](https://github.com/JedWatson/classnames)

## Setup
```
$ yarn
or
$ yarn install
```

## NPM tasks
* `serve` - starts client app in development mode, using webpack dev server at [http://localhost:8000/](http://localhost:8000/).
* `start` - Same as `serve`.
* `dist` - builds a production ready client application.
* `lint` - runs ESLINT on `./src` folder.
* `serve:dev` - same as `serve` with webpack-dashboard.
* `serve:dist` - runs client application in *production* mode, using webpack dev server (use for local testing of the client production build), Hot reload will not work.
* `test` - Run automated testing using karma.
* `test:watch` - Run automted testing with singleRun flag set to `false`.

## Notes

### Folder structure
```
-- cfg // webpack configiration files
    -- base.js
    -- defaults.js
    -- dev.js
    -- dist.js
    -- test.js
-- dist // Distribution files
  ...
-- src
    -- assets
        -- fonts // icon fonts, fonts family
        -- img // svg,png,jpg...
        -- svg // Inline svg as react component
    -- config // config based on environment
        -- base.js
        -- dev.js
        -- dist.js
        -- test.js
    -- javascript
        -- components // react components
          -- ...
        -- store
          -- index.js // Store Configuration
        -- router
          -- index.js // Main Root component
        -- modules
          -- ducks
            -- ... // redux modules (actionCreator, reducers)
          -- sagas
            -- ... // All our sagas to handle asyn flow
          index.js // root reducer
        -- util // shared scripts across multiple components
    -- styles
        -- libs // reset, mixins
        -- mixins // All your shiny mixins
        -- app // app related styles, please keep scss as modular as possible
        main.scss // Base styles, please keep this file small
-- test
    -- components
    -- config
    -- helpers
    -- modules
```

### Redux ducks proposal, and Redux Sauce
Redux store is a way to organized the store using the [Ducks Proposal](https://github.com/erikras/ducks-modular-redux).

[Redux Sauce](https://github.com/infinitered/reduxsauce) is actually a library that provides a few tools to work with redux based codebases, like create actions, create reducers, instead of a bunch of functions, and switch statements.

```javascript
import { createReducer, createActions } from 'reduxsauce';

// Action creators
const { Types, Creators } = createActions( {
  increment: null,
  decrement: null
}, {} );

export { Types, Creators };

// Reducer
const defaultState = {
  counter: 0
};

export default createReducer( defaultState, {
  [Types.INCREMENT]: ( state = defaultState ) => {
    return {
      ...state,
      counter: state.counter += 1
    };
  },
  [Types.DECREMENT]: ( state = defaultState ) => {
    return {
      ...state,
      counter: state.counter -= 1
    };
  }
} );
```
### Use `mapActionToProps`

Lets avoid additional boilerplate by mapping our actions creator to props inside the components.
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Creators } from 'modules/ducks/testModule';
...
  <button onClick={ () => { this.props.increment } }>
    Increment this!
  </button>
...

export default connect( mapStateToProps, { increment: Creators.increment } )( Root );
```

### Alias (please Leverage this)
Important paths have been added to webpack configration as alias, to avoid `../../../componnets...` notations, this will keep our imports statements nice and clean.
```javascript
...
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
  }
...
```

### Importing assets in SCSS
Paths of assets are realtive to  `src/styles/main.scss`.

```css
.example {
  background-image: url(../assets/img/example.jpg);
}
```

### SVG as react component (inline svg)
inline svg are included as react component.

```javascript
import React, { Component } from 'react';
import WebpackLogo from 'assets/svg/webpack.svg';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>inline SVG As react component</h3>

        <WebpackLogo style={ { height: '100px' } }/>
      </div>
    );
  }
}

export default Dashboard;
```

### Importing assets
Import assets using `import` inside our components.
```javascript
import React, { Component } from 'react';
import testLogo from 'assets/images/test_logo.png';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Img src</h3>

        <img src={testLogo} />
      </div>
    );
  }
}

export default Dashboard;
```

