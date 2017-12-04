import React from 'react';
import { dictionaries } from '../../../../test/testData';
import DictionaryItem from '../DictionaryItem';
import config from '../../../../config';

const createTestProps = props => ({
  dictionary: dictionaries[0],
  language: config.defaultLanguage,
  ...props,
});

const createWrapper = props => shallow(<DictionaryItem {...props} />);

describe('rendering', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = createTestProps({});
    wrapper = createWrapper(props);
  });

  it('should render without throwing any error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render button with class green', () => {
    expect(wrapper.find('.button-text').hasClass('green')).toEqual(true);
  });

  it('should render Link to the dictionary page by _id', () => {
    expect(wrapper.find('Link').prop('to')).toEqual(`/dictionaries/${props.dictionary._id}`);
  });

  it('should render h3 with dictionary name in language we pass in', () => {
    expect(wrapper.find('h3').text()).not.toEqual('');
    expect(wrapper.find('h3').text()).toEqual(`${props.dictionary.translations[props.language]}`);
  });
});
