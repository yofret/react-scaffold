/**
 * Function to get the shallow output for a given component
 * As we are using chromeHeadless
 */
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure( { adapter: new Adapter() } );

/**
 * Get the shallow rendered component
 *
 * @param  {Object} component The component to return the output for
 * @return {Object} Shallow rendered output
 */
export default function createComponent( component ) {
  return shallow( component );
}
