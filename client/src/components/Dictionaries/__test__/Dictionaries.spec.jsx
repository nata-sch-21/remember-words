import React from 'react';

import { Dictionaries } from '../index';

const createWrapper = props => shallow(<Dictionaries {...props} />);

describe('rendering', () => {
  // let wrapper = createWrapper({ dictionaries: [] });

  it('should render without throwing any error', () => {
    // expect(wrapper).toHaveLength(1);
  });

  // it('should render Loader if prop dictionaries has no items', () => {
  //   expect(wrapper.find('Loader')).toHaveLength(1);
  // });
  //
  // const dictionaries = [
  //   {
  //     _id: '1',
  //     translations: {
  //       en: 'Fruits',
  //       ru: 'Фрукты',
  //     },
  //   },
  //   {
  //     _id: '2',
  //     translations: {
  //       en: 'Animals',
  //       ru: 'Животные',
  //     },
  //   },
  // ];
  //
  // it('should render .block if prop dictionaries has items', () => {
  //   wrapper = createWrapper({ dictionaries });
  //   expect(wrapper.find('.block')).toHaveLength(1);
  // });
  //
  // it('should render number of DictionaryItem if prop dictionaries has items with the same length', () => {
  //   wrapper = createWrapper({ dictionaries });
  //   expect(wrapper.find('DictionaryItem')).toHaveLength(dictionaries.length);
  // });
});
