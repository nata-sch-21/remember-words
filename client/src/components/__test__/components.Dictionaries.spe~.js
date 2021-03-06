import React from 'react';
import { dictionaries } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK } from '../../constants';
import { Dictionaries } from '../Dictionaries';
import { initialState } from '../../reducers/dictionaries';
import config from '../../../config/app.config';

const createTestProps = props => ({
  dispatch: jest.fn(),
  language: config.defaultLanguage,
  ...props,
});

const createWrapper = props => shallow(<Dictionaries {...props} />);

describe('<Dictionaries> rendering', () => {
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

    it('should render Error with an error message', () => {
      expect(wrapper.find('Error')).toHaveLength(1);
      expect(wrapper.find('Error').prop('message')).toEqual(props.response.message);
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

describe('<Dictionaries> lifecycle', () => {
  let props;
  beforeEach(() => {
    // componentDidMount is called by default if props were put in
    props = createTestProps({ ...initialState });
    createWrapper(props);
  });

  it('dispatch should be called', () => {
    expect(props.dispatch).toHaveBeenCalled();
  });
});
