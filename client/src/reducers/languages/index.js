import { SELECT_LANGUAGE } from '../../constants';

export const initialState = {
  languageFrom: '',
  languageTo: '',
};

export default function languages(state = initialState, action) {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return { languageFrom: action.payload.languageFrom, languageTo: action.payload.languageTo };
    default:
      return state;
  }
}
