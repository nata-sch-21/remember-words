import React from 'react';

import DictionaryItem from '../DictionaryItem';

const createWrapper = props => shallow(<DictionaryItem {...props} />);

const dictionary = {
  _id: '1',
  translations: {
    en: 'Fruits',
    ru: 'Фрукты',
  },
};

describe('rendering', () => {
  let wrapper = createWrapper({ dictionary });

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should have class .block-item', () => {
    expect(wrapper.hasClass('block-item')).toEqual(true);
  });

  it('should render Link to the dictionary page by _id', () => {
    wrapper = createWrapper({ dictionary });
    expect(wrapper.find('Link').prop('to')).toEqual(`/dictionaries/${dictionary._id}`);
  });
});
