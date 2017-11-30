import React from 'react';

import Header from '../index';

const createTestProps = props => ({
  ...props,
});

const createWrapper = props => shallow(<Header {...props} />);

describe('rendering', () => {
  const header = 'Header';
  let wrapper;
  let props;

  beforeEach(() => {
    props = createTestProps({ header });
    wrapper = createWrapper(props);
  });

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render h2 tag', () => {
    expect(wrapper.find('h2')).toHaveLength(1);
  });

  it('should render h2 tag with the header we pass in', () => {
    expect(wrapper.find('h2').text()).toEqual(header);
  });
});
