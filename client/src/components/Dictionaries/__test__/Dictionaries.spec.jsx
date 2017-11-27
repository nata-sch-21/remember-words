import React from 'react';
import { dictionaries } from '../../../../test/testData';
import { STATUS_ERROR, STATUS_OK } from '../../../constants/app';
import { Dictionaries } from '../index';
import { initialState } from '../../../reducers/dictionaries';

const createTestProps = props => ({
  dispatch: jest.fn(),
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

    it('should render only header', () => {
      expect(wrapper.find('.row h2').text()).toEqual('Dictionaries');
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

    it('should render .block with h2 tag with error message', () => {
      expect(wrapper.find('.block h2').text()).toEqual(props.response.message);
    });

    it('should render .block h2 tag with .red class', () => {
      expect(wrapper.find('.block h2').hasClass('red')).toEqual(true);
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
