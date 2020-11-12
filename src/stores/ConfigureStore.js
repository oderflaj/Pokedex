import {combineReducers} from 'redux';
import reducerLanguageApp from './Languages/reducer';
import reducerCatalog from './Catalog/reducer';

const combine = combineReducers({reducerLanguageApp, reducerCatalog});

export default combine;
