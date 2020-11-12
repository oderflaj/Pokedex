import * as Actions from './actions';

const initialState = {
  count: 0,
  catalog: [],
  searchItem: '',
};

export default catalog = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_COUNT:
      return {
        ...state,
        count: action.count,
      };

    case Actions.SET_INITIAL_CATALOG:
      return {
        ...state,
        catalog: action.catalog,
      };

    case Actions.SET_SEARCH_ITEM:
      return {
        ...state,
        searchItem: action.searchItem,
      };
    default:
      return state;
  }
};
