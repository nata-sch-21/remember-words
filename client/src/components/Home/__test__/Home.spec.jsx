import React from 'react';

import Home from '../index';

describe('rendering', () => {
  // wrapper has API jQuery
  const wrapper = shallow(<Home />);

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render Header component', () => {
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('should render Link to the start (select languages) page', () => {
    expect(wrapper.find('Link').prop('to')).toEqual('/start');
  });
});

