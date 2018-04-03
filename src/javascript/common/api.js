import { create } from 'apisauce';
import config from 'config';

export default ( baseURL = config.baseApiURL ) => {
  // define the api
  const api = create( { baseURL } );

  // Request interceptor
  api.addRequestTransform( request => {
    // Add necessary headers, for instance, this is the place where you want to add your
    // authorization header

    request.url = `${request.url}&appid=${config.appKey}`;
  } );

  const getWeatherByCityName = ( city ) => {
    return api.get( `weather?q=${city}` );
  };

  return { getWeatherByCityName };
};
