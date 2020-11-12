export const SET_COUNT = 'SET_COUNT';
export const SET_INITIAL_CATALOG = 'SET_FULL_CATALOG';
export const SET_SEARCH_ITEM = 'SET_SEARCH_ITEM';

export const setCount = (count) => {
  return {
    type: SET_COUNT,
    count,
  };
};

export const setInitialCatalog = (catalog) => {
  return {
    type: SET_INITIAL_CATALOG,
    catalog,
  };
};

export const setSearchItem = (searchItem) => {
  return {
    type: SET_SEARCH_ITEM,
    searchItem,
  };
};
