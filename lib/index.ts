import {combineReducers} from 'redux';
import { toggle, toggleReducer } from './toggle';
import { counter, counterReducer } from './counter';

export const basicReducers = {
    basic: combineReducers({
        toggle: toggleReducer,
        counter: counterReducer,
    }),
};

export {toggle, counter};
