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

    });
  });

  describe('fetching dictionaries', () => {
    it('should render Loader');
  });

  describe('failed load dictionaries', () => {
    it('should render error for user');
  });

  describe('successfully loaded dictionaries', () => {
    beforeEach(() => {
      const props = createTestProps({
        dictionaries,
        isFetching: false,
        response: {
          status: STATUS_OK,
          message: '',
        },
      });
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
