// https://github.com/evgenyrodionov/redux-logger#options  for options please check
export default {
  collapsed: true,
  predicate: ( getState, action ) => {
    return action.type.indexOf( 'GET' ) !== -1 ||
      action.type.indexOf( 'POST' ) !== -1 ||
      action.type.indexOf( 'PUT' ) !== -1 ||
      action.type.indexOf( 'PATCH' ) !== -1;
  }
};
