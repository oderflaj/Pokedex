import * as Actions from './actions';
import {LanguageCatalog} from '../../services/Settings';

const initialState = {
  language: 'en_US',
  languageCatalog: LanguageCatalog['en_US'],
};

export default languageApp = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
        languageCatalog: LanguageCatalog[action.language],
      };
    default:
      return state;
  }
};
