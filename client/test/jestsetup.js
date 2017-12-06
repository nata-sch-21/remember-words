import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import deepFreeze from 'deep-freeze';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Use it in reducers. It would be throw an error if state would be mutated
global.deepFreeze = deepFreeze;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
