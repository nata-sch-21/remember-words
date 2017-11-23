import React from 'react';

import { Dictionaries } from '../index';

const createTestProps = props => ({
  fetchDictionaries: jest.fn(),
  ...props,
});

const createWrapper = props => shallow(<Dictionaries {...props} />);

describe('rendering', () => {
  let wrapper;

  describe('initial state', () => {
    beforeEach(() => {
      const props = createTestProps({ dictionaries: {}, isFetching: false });
      wrapper = createWrapper(props);
    });
    it('should render without throwing any error', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render Loader if prop dictionaries hasn\'t loaded yet', () => {
      expect(wrapper.find('Loader')).toHaveLength(1);
    });
  });

  describe('there are some dictionaries', () => {
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

    beforeEach(() => {
      const props = createTestProps({ dictionaries: { data: dictionaries, response: {}}, isFetching: false });
      wrapper = createWrapper(props);
    });
    it('should render .block if prop dictionaries has items', () => {
      expect(wrapper.find('.block')).toHaveLength(1);
    });

    it('should render number of DictionaryItem if prop dictionaries has items with the same length', () => {
      expect(wrapper.find('DictionaryItem')).toHaveLength(dictionaries.length);
    });
  });
});
