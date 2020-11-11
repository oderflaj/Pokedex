import * as Actions from './actions';

const initialState = {
  language: 'en',
};

export const Language = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_LANGUAGE:
      return {
        ...state,
        language,
      };
  }
};
