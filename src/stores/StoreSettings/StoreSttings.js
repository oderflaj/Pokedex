import {createStore, applyMiddleware} from 'redux';
import combine from '../ConfigureStore';

export const store = createStore(combine);
