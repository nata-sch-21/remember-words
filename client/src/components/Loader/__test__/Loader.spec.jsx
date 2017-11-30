import React from 'react';

import Loader from '../';

describe('rendering', () => {
  const wrapper = shallow(<Loader />);

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render h2 tag', () => {
    expect(wrapper.find('h2')).toHaveLength(1);
  });
});
