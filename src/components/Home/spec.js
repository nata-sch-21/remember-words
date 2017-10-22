import Home from './index';
import { shallow } from 'enzyme';

describe('Home', () => {

    const props = {
        title: 'Home'
    };

    it('renders', () => {
        const element = shallow(<Home { ...props } />);
    });


});
