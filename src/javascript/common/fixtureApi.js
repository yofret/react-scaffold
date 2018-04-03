/* Mock API adapter */
import MockAdapter from 'axios-mock-adapter';

/**
 * Adapt our API endpoints to return fake data
 *
 * @param  {Object} axios api instance
 */
export default ( axiosInstance ) => {
  const mock = new MockAdapter( axiosInstance );

  mock
    .onGet( 'vcc-users/weather?q=London' ).reply( 200, { weather: 'bad' } );
};
