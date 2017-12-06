import React from 'react';
import { dictionaries } from '../../../../test/testData';
import { STATUS_ERROR, STATUS_OK } from '../../../constants/app';
import { Dictionaries } from '../index';
import { initialState } from '../../../reducers/dictionaries';
import config from '../../../../config';

const createTestProps = props => ({
  dispatch: jest.fn(),
  language: config.defaultLanguage,
  ...props,
});

const createWrapper = props => shallow(<Dictionaries {...props} />);

describe('rendering', () => {
  let wrapper;

  describe('initial state', () => {
    beforeEach(() => {
      const props = createTestProps({ ...initialState });
      wrapper = createWrapper(props);
    });

    it('should render without throwing any error', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render Header component', () => {
      expect(wrapper.find('Header')).toHaveLength(1);
    });
  });

  describe('fetching dictionaries', () => {
    const props = createTestProps({
      ...initialState,
      isFetching: true,
    });

    beforeEach(() => {
      wrapper = createWrapper(props);
    });

    it('should render Loader', () => {
      expect(wrapper.find('Loader')).toHaveLength(1);
    });
  });

  describe('failed load dictionaries', () => {
    const props = createTestProps({
      ...initialState,
      response: {
        status: STATUS_ERROR,
        message: 'Error message',
      },
    });

    beforeEach(() => {
      wrapper = createWrapper(props);
    });

    it('should render .red > h3 with error message', () => {
      expect(wrapper.find('.red > h3').text()).toEqual(props.response.message);
    });
  });

  describe('successfully loaded dictionaries', () => {
    const props = createTestProps({
      dictionaries,
      isFetching: false,
      response: {
        status: STATUS_OK,
        message: '',
      },
    });

    beforeEach(() => {
      wrapper = createWrapper(props);
    });

    it('should render .block', () => {
      expect(wrapper.find('.block')).toHaveLength(1);
    });

    it('should render number of DictionaryItem that we pass in', () => {
      expect(wrapper.find('DictionaryItem')).toHaveLength(dictionaries.length);
    });
  });
});

describe('lifecycle', () => {
  let props;
  beforeEach(() => {
    // componentDidMount is called be default if props were put in
    props = createTestProps({ ...initialState });
    createWrapper(props);
  });

  it('dispatch should be called', () => {
    expect(props.dispatch).toHaveBeenCalled();
  });
});
