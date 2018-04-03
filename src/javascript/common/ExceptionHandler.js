//import NetworkErrorException from './Client/NetworkErrorException';
import { get } from 'lodash';
/**
 *
 *
  APISOUCE PROBLEMS

  Constant        VALUE               Status Code   Explanation
  ----------------------------------------------------------------------------------------
  NONE             null               200-299       No problems.
  CLIENT_ERROR     'CLIENT_ERROR'     400-499       Any non-specific 400 series error.
  SERVER_ERROR     'SERVER_ERROR'     500-599       Any 500 series error.
  TIMEOUT_ERROR    'TIMEOUT_ERROR'    ---           Server didn't respond in time.
  CONNECTION_ERROR 'CONNECTION_ERROR' ---           Server not available, bad dns.
  NETWORK_ERROR    'NETWORK_ERROR'    ---           Network not available.
  CANCEL_ERROR     'CANCEL_ERROR'     ---           Request has been cancelled. Only possible if `cancelToken` is provided in config, see axios `Cancellation`.
*/
export default class ExceptionHandler {

  static clientErrorCodes = {
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    CLIENT_ERROR: 'CLIENT_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    CANCEL_ERROR: 'CANCEL_ERROR'
  }

  static throwExceptionBasedOnResponse( response ) {
    const problem = get( response, 'problem', ExceptionHandler.clientErrorCodes.UNKNOWN_ERROR );
    const hasProblem = !get( response, 'ok', false );
    const statusCode = get( response, 'status', null );

    if ( !hasProblem ) return { message: null };

    if ( statusCode === null ) {
      ExceptionHandler.throwExceptionBasedOnProblem( problem );
    }

    switch ( true ) {
      case ( statusCode >= 500 && statusCode <= 599 ):
        throw new ApiErrorException( get( response, 'data.error.message', null ), statusCode );
      case ( statusCode === 404 ):
        throw new ResourceNotFoundException();
      case ( statusCode >= 400 && statusCode <= 499 ):
        throw new ClientErrorException( get( response, 'data.error.message', null ), statusCode  );
      default:
        throw new UnknownErrorException();
    }
  }

  static throwExceptionBasedOnProblem( problem, message = '' ) {
    switch ( problem ) {
      case ExceptionHandler.clientErrorCodes.TIMEOUT_ERROR:
        throw new TimeOutErrorException();

      case ExceptionHandler.clientErrorCodes.CONNECTION_ERROR:
        throw new ConnectionErrorException();

      case ExceptionHandler.clientErrorCodes.NETWORK_ERROR:
        throw new NetworkErrorException();

      default:
        throw new UnknownErrorException( message );
    }
  }
}

/**
 * Helper class to create new Error Types based on HTTP errors
 */
function createHttpErrorType( name, init ) {
  function E( message, code ) {
    if ( Error.captureStackTrace ) {
      Error.captureStackTrace( this, this.constructor );
    } else {
      this.stack = ( new Error() ).stack;
    }

    this.message = message;
    this.code = code;

    if ( init ) init.apply( this, [message, code] );
  }

  E.prototype = new Error();
  E.prototype.name = name;
  E.prototype.constructor = E;

  return E;
}

export const UnknownErrorException = createHttpErrorType( 'UnknownErrorException', function ( message ) {
  this.message = message || 'Something went wrong.';
  this.code = null;
} );

export const NetworkErrorException = createHttpErrorType( 'NetworkErrorException', function ( message ) {
  this.message = message || 'Looks like the API is not active.';
  this.code = null;
} );

export const ConnectionErrorException = createHttpErrorType( 'ConnectionErrorException', function ( message ) {
  this.message = message || 'Looks like the connection failed. Please try again.';
  this.code = null;
} );

export const TimeOutErrorException = createHttpErrorType( 'TimeOutErrorException', function ( message ) {
  this.message = message || 'Looks like the API is taking a long time to respond.';
  this.code = null;
} );

export const ResourceNotFoundException = createHttpErrorType( 'ResourceNotFoundException', function ( message ) {
  this.message = message || 'Resource not found.';
  this.code = 404;
} );

export const ClientErrorException = createHttpErrorType( 'ClientErrorException', function ( message, code ) {
  this.message = message || 'Invalid data sent';
  this.code = code || null;
} );

export const ApiErrorException = createHttpErrorType( 'ApiErrorException', function ( message, code ) {
  this.message = message || 'Something went wrong with the API.';
  this.code = code || null;
} );
