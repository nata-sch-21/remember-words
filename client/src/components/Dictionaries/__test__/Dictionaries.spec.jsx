import React from 'react';

import { Dictionaries } from '../index';

const createWrapper = props => shallow(<Dictionaries {...props} />)

describe('rendering', () => {
  let wrapper = createWrapper({ dictionaries: [] });

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render .loader if prop dictionaries has no items', () => {
    expect(wrapper.find('.wrapper > .loader')).toHaveLength(1);
  });

  it('should render .block if prop dictionaries has items with the same length', () => {
    const dictionaries = [
      {
        _id: '1',
        translations: {
          en: 'Fruits',
          ru: 'Фрукты',
        },
      },
      {
        _id: '2',
        translations: {
          en: 'Animals',
          ru: 'Животные',
        },
      },
    ];

    wrapper = createWrapper({ dictionaries });
    expect(wrapper.find('.block').children()).toHaveLength(dictionaries.length);
  });
});
