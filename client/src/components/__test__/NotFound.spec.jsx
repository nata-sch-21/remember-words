import React from 'react';

import NotFound from '../NotFound';

describe('rendering', () => {
  const wrapper = shallow(<NotFound />);

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render h2 tag', () => {
    expect(wrapper.find('h2')).toHaveLength(1);
  });

  it('should render Link to the home page', () => {
    expect(wrapper.find('Link').prop('to')).toEqual('/');
  });
});
