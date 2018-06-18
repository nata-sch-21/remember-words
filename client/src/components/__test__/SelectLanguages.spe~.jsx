import React from 'react';
import { initialState } from '../../reducers/languages';
import { SelectLanguages } from '../SelectLanguages';
import config from '../../../config/app.config';

const createTestProps = props => ({
  dispatch: jest.fn(),
  history: { push: jest.fn() },
  ...props,
});

const createWrapper = props => shallow(<SelectLanguages {...props} />);

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

    it('should render Header component with correct header', () => {
      expect(wrapper.find('Header')).toHaveLength(1);
    });

    it('should render disabled button with correspond text', () => {
      expect(wrapper.find('.button-text').hasClass('inactive-button')).toEqual(true);
      expect(wrapper.find('.button-text').text()).toEqual('Please select both languages');
    });

    it('should render select#languageFrom with all available languages', () => {
      expect(wrapper.find('#languageFrom option')).toHaveLength(config.availableLanguages.length + 1);
    });

    it('should render select#languageTo with all available languages', () => {
      expect(wrapper.find('#languageTo option')).toHaveLength(config.availableLanguages.length + 1);
    });
  });

  describe('selected both languages', () => {
    beforeEach(() => {
      const props = createTestProps({
        languageFrom: config.availableLanguages[0], languageTo: config.availableLanguages[1],
      });
      wrapper = createWrapper(props);
    });

    it('should render available submit button', () => {
      expect(wrapper.find('.button-text').hasClass('green')).toEqual(true);
      expect(wrapper.find('.button-text').text()).toEqual('Go to dictionaries');
    });

    it('should render selected languages that we pass in', () => {
      expect(wrapper.find('select#languageFrom').props().value).toEqual(config.availableLanguages[0]);
      expect(wrapper.find('select#languageTo').props().value).toEqual(config.availableLanguages[1]);
    });

    it('should render options in select without language selected in other select', () => {
      expect(wrapper.find('#languageFrom option').filterWhere(item => item.prop('value') === config.availableLanguages[1]).length).toEqual(0);
      expect(wrapper.find('#languageTo option').filterWhere(item => item.prop('value') === config.availableLanguages[0]).length).toEqual(0);
    });
  });
});

describe('interaction', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = createTestProps({ ...initialState });
    wrapper = createWrapper(props);
  });

  describe('submit button', () => {
    it('should be called history.push with /dictionaries', () => {
      wrapper.setState({
        languageFrom: config.availableLanguages[0], languageTo: config.availableLanguages[1],
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/dictionaries');
    });

    it('shouldn\'t be called history.push with one selected language or without both', () => {
      wrapper.setState({
        languageFrom: '', languageTo: config.availableLanguages[1],
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.history.push).not.toHaveBeenCalledWith('/dictionaries');

      wrapper.setState({
        languageFrom: config.availableLanguages[0], languageTo: '',
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.history.push).not.toHaveBeenCalledWith('/dictionaries');

      wrapper.setState({
        languageFrom: '', languageTo: '',
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.history.push).not.toHaveBeenCalledWith('/dictionaries');
    });

    it('should be called dispatch', () => {
      wrapper.setState({
        languageFrom: config.availableLanguages[0], languageTo: config.availableLanguages[1],
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.dispatch).toHaveBeenCalled();
    });

    it('shouldn\'t be called dispatch with one selected language or without both', () => {
      wrapper.setState({
        languageFrom: '', languageTo: config.availableLanguages[1],
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.dispatch).not.toHaveBeenCalledWith();

      wrapper.setState({
        languageFrom: config.availableLanguages[0], languageTo: '',
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.dispatch).not.toHaveBeenCalledWith();

      wrapper.setState({
        languageFrom: '', languageTo: '',
      });
      wrapper.find('.button-text').simulate('click');
      expect(props.dispatch).not.toHaveBeenCalledWith();
    });
  });

  describe('onChange languages', () => {
    beforeEach(() => {
      wrapper.setState({
        languageFrom: '', languageTo: '',
      });
    });

    describe('onChange languageFrom', () => {
      beforeEach(() => {
        wrapper.find('#languageFrom').simulate('change', { target: { value: config.availableLanguages[0], id: 'languageFrom' } });
      });

      it('in select#languageFrom there should be selected language we pass in', () => {
        expect(wrapper.find('#languageFrom').props().value).toEqual(config.availableLanguages[0]);
      });

      it('select#languageTo shouldn\'t contain language which selected in select#languageFrom', () => {
        expect(wrapper.find('#languageTo option').filterWhere(item => item.prop('value') === config.availableLanguages[0]).length).toEqual(0);
      });
    });

    describe('onChange languageTo', () => {
      beforeEach(() => {
        wrapper.find('#languageTo').simulate('change', { target: { value: config.availableLanguages[1], id: 'languageTo' } });
      });

      it('in select#languageTo there should be selected language we pass in', () => {
        expect(wrapper.find('#languageTo').props().value).toEqual(config.availableLanguages[1]);
      });

      it('select#languageTo shouldn\'t contain language which selected in select#languageFrom', () => {
        expect(wrapper.find('#languageFrom option').filterWhere(item => item.prop('value') === config.availableLanguages[1]).length).toEqual(0);
      });
    });
  });
});
