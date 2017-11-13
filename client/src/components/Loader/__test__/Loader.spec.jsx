import React from 'react';

import Loader from '../';

describe('rendering', () => {
  const wrapper = shallow(<Loader />);

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should have class .loader', () => {
    expect(wrapper.hasClass('loader')).toEqual(true);
  });
});
