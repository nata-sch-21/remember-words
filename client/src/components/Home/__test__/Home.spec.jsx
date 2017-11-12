import React from 'react';

import { Home } from '../index';

describe('rendering', () => {
  // wrapper has API jQuery
  const wrapper = shallow(<Home />);

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render Link to the dictionaries page', () => {
    expect(wrapper.find('Link').prop('to')).toEqual('/dictionaries');
  });
});

// contains everything related to callback functions and interactions
describe('interaction', () => {

});

// contains tests related to react lifecycle functions
describe('lifecycle', () => {

});
